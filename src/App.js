import React from "react";
import "./App.css";

import { Api } from "../src/utils/index";
import { Home, Login, Register } from "./page/index";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <AnimationApp />
    </Router>
  );
}

function AnimationApp() {
  let location = useLocation();
  const history = useHistory();
  function PrivateRouteWithoutLogin({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem("login") ? (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  }

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem("login") ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
  return (
    <Switch location={location}>
      <PrivateRouteWithoutLogin exact path="/login">
        <Login history={history} />
      </PrivateRouteWithoutLogin>
      <PrivateRouteWithoutLogin exact path="/register">
        <Register history={history} />
      </PrivateRouteWithoutLogin>
      <PrivateRoute exact path="/">
        <Home history={history} />
      </PrivateRoute>
    </Switch>
  );
}
const styles = {};

styles.fill = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

styles.content = {
  ...styles.fill,
};

export default App;
