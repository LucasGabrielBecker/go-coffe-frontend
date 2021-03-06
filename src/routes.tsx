import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignInSide from "./pages/Login/index"
import SignUp from "./pages/SignUp/index"
import MainPage from "./pages/Main"
import  CoffeView from "./pages/CoffeView"

export default function Routes() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <SignInSide />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/main">
            <MainPage />
          </Route>
          <Route path="/gos/:id">
            <CoffeView />
          </Route>
        </Switch>
    </Router>
  );
}