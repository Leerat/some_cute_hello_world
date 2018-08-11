import React from 'react'
import styled, { keyframes } from 'styled-components'

const twist = keyframes`
  0% {transform: translateY(0px)}
  30% {transform: translateY(-8px)}
  43% {transform: rotate(5deg)}
  46% {transform: rotate(-5deg)}
  50% {transform: rotate(0deg)}
  100% {transform: translateY(0px)}
`

const StyledLetter = styled.div`
  position: relative;
  color: white;
  font-size: ${props => props.big ? '6rem' : '3rem'};
  font-weight: bold;
  min-width: 16px;
  animation: ${props => props.isAnimated ? `${twist} 1s 2 ease-in-out` : 'none'};
  &:before {
    font-size: 1rem;
    font-weight: normal;
    transition: opacity 1.5s ease-in-out;
    opacity: ${props => props.isAnimated ? `0.6` : `0`};
    content: 'drag me plz';
    position: absolute;
    width: 85px;
    text-align: center;
    top: -20px;
    left: calc(-42px + 50%);
  }
`

const Letter = props => <StyledLetter {...props}>{props.letter}</StyledLetter>

export default Letter
