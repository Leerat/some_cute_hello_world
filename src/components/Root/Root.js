import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from 'components/Header/Header'
import Phrase from 'components/Phrase/Phrase'
import BigLetter from 'components/BigLetter/BigLetter'

const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px;
  color: #fff;
  background: linear-gradient(20deg,rgb(219,112,147),#daa357);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  *:focus {
    outline: none;
  }
  display: flex;
  flex-direction: column;
`

const HelloWorld = styled.div`
  flex: 1 1 auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Centered = styled.div`
  flex: 1;
`

class App extends Component {

  state = {
    isComplete: true,
  }

  toggleComplete = () => {
    this.setState({isComplete: !this.state.isComplete})
  }

  render() {
    const { isComplete } = this.state

    return (
      <Router>
        <Body>
          <Header />
          <HelloWorld>
            <Centered>
              <Route exact path="/" component={Phrase} key="PhraseRoute" />
              <Route exact path="/:letter" component={BigLetter} key="LettersRoute" />
            </Centered>
          </HelloWorld>
        </Body>
      </Router>
    )
  }
}

export default hot(module)(App)
