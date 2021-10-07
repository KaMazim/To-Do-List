import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './Login.jsx';
import { SignUp } from './SignUp.jsx';
import { ProtectedContent } from './ProtectedContent.jsx';
import { LoadingPage } from './LoadingPage.jsx';
import { createGlobalStyle } from 'styled-components';

// Comentario Teste

const GlobalStyle = createGlobalStyle`
    *, *::after {
      margin: 0; padding: 0;
      box-sizing: border-box;
      text-decoration: none; outline: none;
      font-family: 'Montserrat', sans-serif;
      color: #191919;
      transition: all 0.2s;
    }

    a, button, input[type="button"], label {
      cursor: pointer;
      font-family: inherit;
      font-weight: 700;
      font-size: inherit;
      color: inherit; background-color: inherit;
      user-select: none;
  
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color: transparent;
    }
    
    input {
        user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
    }
`;

export function App() {
  const userExistence = useTracker(() => Meteor.user());

  function verifyConnection() {
    //Verifying if the connection to the server was successful
    if(typeof userExistence !== 'undefined') {

      //Verifying if there is a logged user
      if(userExistence) {
        return <ProtectedContent />;
        
      } 
      else {
        return (
          <Fragment>
            <Route exact path="/login">
              <Login />
            </Route> 
            <Redirect to="/login" />
          </Fragment> 
        );
      }

    }
    else {
      return (
        <Route path="*">
          <LoadingPage />
        </Route>
      );
    }
  }

  return (
    <Router>
      <GlobalStyle />
       
      <Switch>
        <Route exact path="/signup">
          <SignUp />
        </Route>

        {verifyConnection()}

      </Switch>
    </Router>
  );
}