import React from 'react'
import styled from 'styled-components'

const Body = styled.nav`
  text-align: right;
  a {
    color: #fff;
  }
`

const Header = () => <Body><a href="https://github.com/Leerat/some_cute_hello_world">View source on github</a></Body>

export default Header
