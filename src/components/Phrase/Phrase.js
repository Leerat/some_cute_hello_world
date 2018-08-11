import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Letter from 'components/Letter/Letter'
import { getPhraseSelector, getIsDraggedSelector } from 'components/Phrase/phraseSelectors'
import { reorderPhrase, dragLetter } from 'components/Phrase/phraseActions'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const Body = styled.div`
  position: absolute;
  top: calc(50% - 36px);
  left: 0;
  width: 100%;
  
  &.fade-enter {
    opacity: 0.01;
    transform: translateX(-100%);
  }

  &.fade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 250ms ease-out;
  }

  &.fade-exit {
    opacity: 1;
    transform: translateX(0);
  }

  &.fade-exit-active {
    opacity: 0.01;
    transform: translateX(-100%);
    transition: all 250ms ease-in;
  }
`

const DraggedSpoiler = styled.div`
  text-align: center;
  transition: opacity 1s ease-in-out;
  opacity: ${props => props.visible ? '1' : '0'};
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
    const { isDragged } = this.props
    if (isDragged) return

    const int = setInterval(()=>{
      this.setState({animatedLetterNumber: this.getRandomLetterNumber()})
    }, 6000)

    this.setState({
      int: int,
      animatedLetterNumber: this.getRandomLetterNumber()
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.int)
  }

  getRandomLetterNumber = () => {
    const { phrase } = this.props
    return  Math.floor(Math.random() * phrase.length)
  }

  onDragStart = () => {
    clearInterval(this.state.int)
    this.setState({animatedLetterNumber: null})
  }

  onDragEnd = result => {
    const { phrase, reorderPhrase, dragLetter } = this.props

    if (!result.destination) {
      return
    }

    const newPhrase = reorder(
      phrase,
      result.source.index,
      result.destination.index
    )

    reorderPhrase(newPhrase)
    dragLetter()
  }

  render() {
    const { animatedLetterNumber } = this.state
    const { phrase, isDragged } = this.props

    return (
      <Body>
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
        <DraggedSpoiler visible={isDragged}>Or you can click on any letter</DraggedSpoiler>
      </Body>
    )
  }
}

export default connect(
  state => ({
    phrase: getPhraseSelector(state),
    isDragged: getIsDraggedSelector(state)
  }),
  {
    reorderPhrase,
    dragLetter
  }
)(Phrase)
