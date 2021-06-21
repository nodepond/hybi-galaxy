import * as React from 'react'
import { Header } from './components/Header/Header'
import styled from 'styled-components'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import { Enter } from "./pages/Enter/Enter"
import { Speaker } from "./pages/Speaker/Speaker"
import { Beamer } from "./pages/Beamer/Beamer"
import { Session } from "./pages/Session/Session"

const AppContainer = styled.div`
  text-align: center;
  position: fixed;
  width: 100%;
  height: 100%;
  cursor: default;
`

function App() {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route path="/enter/:id">
            <Enter />
          </Route>
          <Route path="/session/:id">
            <Session />
          </Route>
          <Route path="/speaker/:id">
            <Speaker />
          </Route>
          <Route path="/beamer/:id">
            <Beamer />
          </Route>
          <Route path="/">
            <Header>Hybi-Galaxy</Header>
            <Home />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  )
}

export default App
