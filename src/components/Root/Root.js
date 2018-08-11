import React, { Component } from 'react'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'

import Header from 'components/Header/Header'
import Phrase from 'components/Phrase/Phrase'
import BigLetter from 'components/BigLetter/BigLetter'
import Missed from 'components/Missed/Missed'

const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px;
  color: #fff;
  background: linear-gradient(18deg,#dd7195,#dba255);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  *:focus {
    outline: none;
  }
  overflow: hidden;
`

const HelloWorld = styled.div`
  text-align: center;
`

class Root extends Component {
  render() {
    const { location } = this.props

    return (
      <Body>
        <Header />
        <HelloWorld>
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={500}>
              <Switch location={location} >
                <Route exact path="/" component={Phrase} key="PhraseRoute" />
                <Route exact path="/:letter([a-zA-Z])" component={BigLetter} key="LetterRoute" />
                <Route component={Missed} key="MissedRoute"/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </HelloWorld>
      </Body>
    )
  }
}

export default withRouter(Root)
