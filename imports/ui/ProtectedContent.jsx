import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './Home.jsx';
import { History } from './History.jsx';
import { Header } from "./Header.jsx";
import styled from 'styled-components';
import { Account } from './Account.jsx';

const Wrapper = styled.section`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-block: 4rem;
`;

export function ProtectedContent() {
    return (
        <Router>
          <Redirect to="/" />
          <Wrapper>
              <Header />

              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>

                <Route exact path="/history">
                  <History />
                </Route>

                <Route exact path="/account">
                  <Account />
                </Route>
              </Switch>
            </Wrapper>
        </Router>
    );
}