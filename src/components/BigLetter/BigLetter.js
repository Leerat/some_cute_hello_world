import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Letter from 'components/Letter/Letter'
import Button from 'components/UI/Button/Button'

const Text = styled.div`
  font-size: 2rem;
`

const BigLetter = props => (
  <>
    <Text>Just big</Text>
    <Letter big letter={props.match.params.letter} />
    <Text>letter</Text>
    <div>
      <Link to='/'><Button>{`<`} Go back</Button></Link>
    </div>
  </>
)

export default BigLetter
