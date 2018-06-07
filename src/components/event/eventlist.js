import React, { Component } from 'react';
import edit as actions from '../../actions';
import { connect } from 'react-redux';

class Edit extends Component {
  render(){
    this.props.edit_event_list();
    return(
        <table id = "edit_event_list">
        </table>
    )
  }
}

export default connect(null, actions)(Edit);
