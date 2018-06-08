import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderLinks() {
		if ( this.props.authenticated ) {
			return [
				<li className="nav-item">
					<Link className="nav-link" to="/signout">Sign Out</Link>
				</li>
			];
		} else {
			return [
				<li className="nav-item" key="2">
					<Link className="nav-link" to="/announcement">Announcements</Link>
				</li>,
				<li className="nav-item" key="3">
					<Link className="nav-link" to="/event">Events</Link>
				</li>
			];
		}
	}

	renderLinksRight() {
		if ( this.props.authenticated ) {
			return [
				<li className="nav-item">
					<Link className="nav-link" to="/signout">Sign Out</Link>
				</li>
			];
		} else {
			return [
				<li className="nav-item" key="1">
					<Link className="nav-link" to="/signin">Sign In</Link>
				</li>,
				<li className="nav-item" key="2">
					<Link className="nav-link" to="/signup">Sign Up</Link>
				</li>
			];
		}
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link to="/" className="navbar-brand">Sport Registration System</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
					<ul className="nav navbar-nav">
						{this.renderLinks()}
					</ul>
					<ul className="navbar-nav">
						{this.renderLinksRight()}
					</ul>
				</div>
			</nav>
		);
	}

}

const mapStateToProps = state => {
	return {
		authenticated: state.auth.authenticated
	}
};


export default connect(mapStateToProps, null)(Header);
