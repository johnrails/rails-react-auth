import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

import { getPage } from "../lib/Api";

class PageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        id: props.match.params.id,
        content: ""
      },
      loading: true,
      flashMessage: {
        message: undefined,
        style: "success"
      }
    };

    this.fetchPage = this.fetchPage.bind(this);
  }

  compnentDidMount() {
    this.fetchPage();
  }

  componentWillReceiveProps(nextProps) {
    let prevPageId = this.props.match.params.id;
    let newPageId = nextProps.match.params.id;
    // check if page comoenet is being reloaded with new page props && reload page from Api
    if (prevPageId !== newPageId) {
      this.setState({
        page: {
          id: newPageId,
          content: ""
        }
      });

      this.fetchPage(newPageId);
    }
  }

  fetchPage(pageId = null) {
    console.log("im getting the page");
    pageId = pageId || this.state.page.id;
    this.setState({
      loading: true,
      flashMessage: {
        message: undefined,
        style: "success"
      }
    });

    let jwt = this.props.appState.jwt;
    getPage(jwt, pageId).then(response => {
      if (response) {
        this.setState({
          page: response,
          loading: false
        });
      } else {
        this.setState({
          loading: false,
          flashMessage: {
            message: "Access Denied.",
            style: "danger"
          }
        });
      }
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={12}>
            {this.state.flashMessage.message && (
              <Container>
                <Row>
                  <Col xs={12} md={12}>
                    <Alert variant={this.state.flashMessage.style}>
                      {this.state.flashMessage.message}
                    </Alert>
                  </Col>
                </Row>
              </Container>
            )}

            <div>{this.state.page.content}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PageComponent;
