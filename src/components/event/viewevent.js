import React, { Component } from 'react';
import edit from '../../actions';
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

export default connect(null, edit)(ViewEvent);
