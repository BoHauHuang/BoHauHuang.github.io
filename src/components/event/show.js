import React, { Component } from 'react';
import * as editActions from '../../actions/edit';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

const Events = ({ match }) => {
	console.log(match);
  return (
    <div>
      {match.params.id}
    </div>
  )
};


export default Events;
