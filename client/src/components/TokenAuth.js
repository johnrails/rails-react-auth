import React from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppHeader from "./AppHeader";
import AuthSignin from "./AuthSignin";
import AuthSignOut from "./AuthSignOut";
import PageHome from "./PageHome";
import Page from "./Page";

const Api = require("../lib/Api");

class TokenAuthComponent extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <AppHeader appState={this.state} />
          <Route exact path="/" component={PageHome} />
          <Route
            exact
            path="/page/:id"
            render={routeProps => (
              <Page {...routeProps} appState={this.state} />
            )}
          />

          {this.state.jwt && (
            <Route
              exact
              path="/sign-out"
              render={routeProps => (
                <AuthSignOut
                  {...routeProps}
                  propagateSignOut={this.propagateSignOut}
                />
              )}
            />
          )}
        </div>
      </Router>
    );
  }

  componentDidMount() {
    this.getUsers();
    this.getPages();
  }

  defaultState() {
    return {
      cookieName: "rails-react-auth-jwt",
      email: undefined,
      jwt: undefined,
      user_id: undefined,
      pages: []
    };
  }

  constructor(props) {
    super(props);
    this.state = this.defaultState();

    this.propagateSignIn = this.propagateSignIn.bind(this);
    this.propagateSignOut = this.propagateSignOut.bind(this);
  }

  propagateSignIn(jwt, history = undefined) {
    const { cookies } = this.props;
    cookies.set(this.state.cookieName, jwt, { path: "/" });
    this.getUser(history);
  }

  propagateSignOut(history = undefined) {
    const { cookies } = this.props;
    cookies.remove(this.state.cookieName);
    this.setState({
      email: undefined,
      user_id: undefined,
      jwt: undefined
    });

    if (history) {
      history.push("/");
    }
  }

  getPages() {
    Api.getPages().then(response => {
      this.setState({
        pages: response
      });
    });
  }

  getUser(history = undefined) {
    const { cookies } = this.props;
    let jwt = cookies.get(this.state.cookieName);
    if (!jwt) return null;

    Api.getCurrentUser(jwt).then(response => {
      if (response !== undefined) {
        this.setState({
          email: response.email,
          user_id: response.id,
          jwt: jwt
        });
      } else {
        cookies.remove(this.state.cookieName);
        this.setState({
          email: undefined,
          user_id: undefined,
          jwt: undefined
        });
      }
    });
  }
}

TokenAuthComponent.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

export default withCookies(TokenAuthComponent);
