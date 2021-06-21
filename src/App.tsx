import * as React from 'react'
import { Header } from './components/Header/Header'
import styled from 'styled-components'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import { Enter } from "./pages/Enter/Enter"
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
          {/* TODO: add a special route for beamer-view (and other admin-routes) */}
          <Route path="/beamer/:id">
            <Beamer />
          </Route>
          <Route path="/enter/:id">
            <Enter />
          </Route>

          <Route path="/session/:id">
            {/* TODO: redirect to "/enter" if this the first time the user in this conference */}
            <Session />
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
