import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class AppHeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Rails React Token Auth</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer exact to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {this.props.appState.pages.map(page => {
              return (
                <LinkContainer
                  key={`page_${page.id}`}
                  exact
                  to={`/page/${page.id}`}
                >
                  <Nav.Link>{page.title}</Nav.Link>
                </LinkContainer>
              );
            })}
          </Nav>

          <Nav className="justify-content-end">
            {!this.props.appState.jwt && (
              <LinkContainer exact to="/sign-in">
                <Nav.Link>Sign In</Nav.Link>
              </LinkContainer>
            )}

            {this.props.appState.jwt && (
              <LinkContainer extact to="/sign-out">
                <Nav.Link>Sign Out</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AppHeaderComponent;
