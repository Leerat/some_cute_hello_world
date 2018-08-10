import React from 'react'
import styled from 'styled-components'

const StyledLetter = styled.div`
  color: white;
  font-size: ${props => props.big ? '6rem' : '3rem'};
  font-weight: bold;
  min-width: 16px;
`

const Letter = props => <StyledLetter {...props}>{props.letter}</StyledLetter>

export default Letter
