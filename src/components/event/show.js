import React, { Component } from 'react';
import * as editActions from '../../actions/edit';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const Events = ({ match }) => {
	console.log(match);
	this.props.fetchEvent(match.params.id);
	return (
		<div className="alert alert-warning" role="alert">
		HI
		</div>
  )
};


export default Events;
