import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ViewEvent extends Component {

  render(){
    this.props.view_event();
    return(
        <div className="col-sm-12" id = "view_event">
        </div>
    )
  }
}


ViewEvent = reduxForm({
  form: "viewevent",
})(ViewEvent);

export default connect(null, actions)(ViewEvent);
