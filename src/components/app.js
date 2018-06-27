import React, { Component } from "react";
import Header from "./header";
import * as actions from "../actions";
import { connect } from "react-redux";

class App extends Component {
  componentWillMount() {
    this.props.initialUser();
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
