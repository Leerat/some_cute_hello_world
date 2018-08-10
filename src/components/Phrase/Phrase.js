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

const Letters = ({items, animatedLetterNumber}) => items.map((letter, index) => (
  <Draggable key={`letter_${letter}_${index}`} draggableId={`${letter}_${index}`} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={provided.draggableProps.style}
      >
        <StyledLink to={`/${letter}`}>
          <Letter letter={letter} isAnimated={animatedLetterNumber === index} />
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

  state = {
    int: null,
    animatedLetterNumber: null
  }

  componentDidMount () {
    const int = setInterval(()=>{
      this.setState({animatedLetterNumber: this.getAnimatedLetterNumber()})
    }, 6000)

    this.setState({
      int: int,
      animatedLetterNumber: this.getAnimatedLetterNumber()
    })
  }

  getAnimatedLetterNumber = () => {
    const { phrase } = this.props
    return  Math.floor(Math.random() * phrase.length)
  }

  onDragStart = () => {
    clearInterval(this.state.int)
    this.setState({animatedLetterNumber: null})
  }

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
    const { animatedLetterNumber } = this.state
    const { phrase } = this.props

    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={phraseStyle}
            >
              {
                <Letters items={phrase} animatedLetterNumber={animatedLetterNumber} />
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
