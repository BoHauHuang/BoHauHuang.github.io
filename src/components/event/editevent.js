import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class EditEvent extends Component {
  render(){
    this.props.edit_event_list();
    return(
        <table id = "edit_event_list">
        </table>
    )
  }
}

EditEvent = reduxForm({
  form: "editevent",
})(EditEvent);

export default connect(null, actions)(EditEvent);
