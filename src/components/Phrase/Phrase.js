import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Letter from 'components/Letter/Letter'
import { getPhraseSelector } from 'components/Phrase/phraseSelectors'
import { reorderPhrase } from 'components/Phrase/phraseActions'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const Letters = ({items}) => items.map((letter, index) => (
  <Draggable key={`letter_${letter}_${index}`} draggableId={`${letter}_${index}`} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={provided.draggableProps.style}
      >
        <StyledLink to={`/${letter}`}>
          <Letter letter={letter} />
        </StyledLink>
      </div>
    )}
  </Draggable>
))

const phraseStyle = {
  display: 'flex',
  justifyContent: 'center'
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

class Phrase extends Component {

  onDragEnd = result => {
    const { phrase, reorderPhrase } = this.props

    if (!result.destination) {
      return
    }

    const newPhrase = reorder(
      phrase,
      result.source.index,
      result.destination.index
    )

    reorderPhrase(newPhrase)
  }

  render() {
    const { phrase } = this.props

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={phraseStyle}
            >
              {
                <Letters items={phrase} />
              }
              {
                provided.placeholder
              }
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default connect(
  state => ({
    phrase: getPhraseSelector(state)
  }),
  {
    reorderPhrase
  }
)(Phrase)
