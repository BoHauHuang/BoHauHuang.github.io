import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderLinks() {
    return [
      <li className="nav-item" key="2">
        <Link className="nav-link" to="/">
          所有公告
        </Link>
      </li>,
      <li className="nav-item" key="3">
        <Link className="nav-link" to="/event">
          體育活動
        </Link>
      </li>,
      <li className="nav-item" key="4">
        <Link className="nav-link" to="/event/participation">
          報名紀錄
        </Link>
      </li>
    ];
  }

  renderLinksRight() {
    if (this.props.authenticated && this.props.auth.name) {
      return [
        <li className="nav-item" key="1">
          <Link className="nav-link" to="/profile/">
            哈囉，{this.props.auth.name}
          </Link>
        </li>,
        <li className="nav-item" key="2">
          <Link className="nav-link" to="/signout">
            登出
          </Link>
        </li>
      ];
    } else {
      return [
        <li className="nav-item" key="1">
          <Link className="nav-link" to="/signin">
            登入
          </Link>
        </li>,
        <li className="nav-item" key="2">
          <Link className="nav-link" to="/signup">
            註冊
          </Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Sport Registration System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <ul className="nav navbar-nav">{this.renderLinks()}</ul>
            <ul className="navbar-nav">{this.renderLinksRight()}</ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    auth: {
      name: state.auth.sessionUser.name
    }
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
