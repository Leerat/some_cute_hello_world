import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Letter from 'components/Letter/Letter'
import Button from 'components/UI/Button/Button'

const Body = styled.div`
  position: absolute;
  top: calc(50% - 116px);
  left: 0;
  width: 100%;
  
  &.fade-enter {
    opacity: 0.01;
    transform: translateX(100%);
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
    transform: translateX(100%);
    transition: all 250ms ease-in;
  }
`

const Text = styled.div`
  font-size: 2rem;
`

const BigLetter = props => (
  <Body>
    <Text>Just big</Text>
    <Letter big letter={props.match.params.letter} />
    <Text>letter</Text>
    <div>
      <Link to='/'><Button>{`<`} Go back</Button></Link>
    </div>
  </Body>
)

export default BigLetter
