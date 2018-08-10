import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

import Header from 'components/Header/Header'
import Button from 'components/UI/Button/Button'
import Phrase from 'components/Phrase/Phrase'

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
`

const HelloWorld = styled.div`
  text-align: center;
  margin-top: 50%;
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
      <Body>
        <Header />
        <HelloWorld>
          <Phrase />
          <div>
            {isComplete ? `Hell yeah!` : `Work in progress`}
          </div>
          <div>
            <Button onClick={this.toggleComplete}>{isComplete ? `Return to work` : `Complete it!`}</Button>
          </div>
        </HelloWorld>
      </Body>
    )
  }
}

export default hot(module)(App)
