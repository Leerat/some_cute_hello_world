import React from 'react'
import styled from 'styled-components'

const StyledLetter = styled.div`
  font-size: 3em;
  font-weight: bold;
  min-width: 16px;
`

const Letter = props => <StyledLetter {...props}>{props.letter}</StyledLetter>

export default Letter
