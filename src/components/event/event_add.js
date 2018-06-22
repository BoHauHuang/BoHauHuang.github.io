import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as editActions from '../../actions/EventAction';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class AddEvent extends Component {
  renderInput(field) {
		return (
			<div>
				<input className="form-control" {...field.input} type={field.type} />
			</div>
		);
	}
  add_event_Submit({name,teamMax,memMin, datetime}) {
		console.log(name,teamMax,memMin, datetime);
		this.props.addEvent({name,teamMax,memMin, datetime});
    this.props.history.push('/event');
	}

  render(){
    const {handleSubmit} = this. props;
    return(
      <form onSubmit={handleSubmit(this.add_event_Submit.bind(this))}>
        <fieldset className="form-group">
          <label>Event Name: </label>
          <Field name="name" component={this.renderInput} type="text" />
          <label>Team maximum: </label>
          <Field name="teamMax" component={this.renderInput} type="number" />
          <label>Member minimum: </label>
          <Field name="memMin" component={this.renderInput} type="number" />
          <label>Time: </label>
          <Field name="datetime" component={this.renderInput} type="datetime-local" />
        </fieldset>

      <button action="submit" className="btn btn-primary">Submit</button>
    </form>
    );
  }
}

export default connect(null, editActions)(reduxForm({form: "AddEvent"})(AddEvent));
