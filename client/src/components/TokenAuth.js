import React from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppHeader from "./AppHeader";
import AuthSignIn from "./AuthSignIn";
import AuthSignOut from "./AuthSignOut";
import PageHome from "./PageHome";
import Page from "./Page";
import { getPages, getCurrentUser } from "../lib/Api";

class TokenAuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState();

    this.propagateSignIn = this.propagateSignIn.bind(this);
    this.propagateSignOut = this.propagateSignOut.bind(this);
    this.getPages = this.getPages.bind(this);
    this.getUser = this.getUser.bind(this);
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
    getPages().then(response => {
      this.setState({
        pages: response
      });
    });
  }

  getUser(history = undefined) {
    const { cookies } = this.props;
    let jwt = cookies.get(this.state.cookieName);
    if (!jwt) return null;

    getCurrentUser(jwt).then(response => {
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

  componentDidMount() {
    this.getUser();
    this.getPages();
  }

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

          {!this.state.jwt && (
            <Route
              exact
              path="/sign-in"
              render={routeProps => (
                <AuthSignIn
                  {...routeProps}
                  propagateSignIn={this.propagateSignIn}
                />
              )}
            />
          )}
        </div>
      </Router>
    );
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
}

TokenAuthComponent.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

export default withCookies(TokenAuthComponent);
