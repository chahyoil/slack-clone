import React, { FC } from "react";
import loadable from '@loadable/component';
import {Switch, Route, Redirect} from "react-router";
const LogIn = loadable( () => import('@pages/LogIn'));
const SignUp = loadable( () => import('@pages/SignUp'));

const App: FC = () => {
  return (
    <Switch>
      <Redirect exact path="/login" to="/login" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
};

export default App;
