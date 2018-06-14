import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as editActions from '../../actions/edit';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class SignupEvent extends Component {
  renderInput(field) {
    return (
      <div>
        <input className="form-control" {...field.input} type={field.type} />
        </div>
      );
    }
  add({name}){
    console.log(name);
    this.props.addEvent({name});
  }

  render(){
    const {handleSubmit} = this.props;
    return(
      <form onSubmit={handleSubmit(this.add.bind(this))}>
        <fieldset className="form-group">
          <label>Event Name: </label>
          <Field name="name" component={this.renderInput} type="text" />
          </fieldset>

      <button action="submit" className="btn btn-primary">Submit</button>
      <button action="cancel" className="btn btn-success">Cancel</button>
    </form>
    );
  }
}

AddEvent = reduxForm({
  form: "add",
})(AddEvent);

export default connect(null, actions)(AddEvent);
