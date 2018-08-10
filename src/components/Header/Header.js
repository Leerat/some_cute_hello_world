import React from 'react'
import styled from 'styled-components'

const Body = styled.nav`
  text-align: right;
  a {
    color: #fff;
  }
`

const Header = () => <Body><a href="https://github.com">View source on github</a></Body>

export default Header
