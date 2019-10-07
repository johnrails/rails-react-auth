import React from "react";
import { CookiesProvider } from "react-cookie";
import TokenAuth from "./TokenAuth";
import "bootstrap/dist/css/bootstrap.min.css";
class AppComponent extends React.Component {
  render() {
    return (
      <CookiesProvider>
        <TokenAuth />
      </CookiesProvider>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
