import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as editActions from '../../actions/edit';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class AddEvent extends Component{
  render(){
    return(



    )
  }

}

AddEvent = reduxForm({
  form: "add",
})(AddEvent);

export default connect(null, actions)(AddEvent);
