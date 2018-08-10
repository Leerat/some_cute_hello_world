import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: white;
  color: palevioletred;
  border: none;
`

const Button = ({content = '', onClick, children}) => <StyledButton onClick={onClick}>{content !== '' ? content : children}</StyledButton>

export default Button
