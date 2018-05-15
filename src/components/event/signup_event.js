import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SignupEvent extends Component {

  renderInput(field) {
		return (
			<div>
				<input className="form-control" {...field.input} type={field.type} />
			</div>
		);
	}
  register_team({name}){
    console.log(name);
    this.props.RegisterTeam({name});
  }

  render(){
    const {handleSubmit} = this.props;
    return(
        <form onSubmit={handleSubmit(this.register_team.bind(this))}>
          <fieldset className="form-group">
            <label>Team Name: </label>
            <Field name="name" component={this.renderInput} type="text" />
            </fieldset>

        <button action="submit" className="btn btn-primary">Submit</button>
        <button action="cancel" className="btn btn-success">Cancel</button>
      </form>
    );
  }
}

SignupEvent = reduxForm({
  form: "signup_event",
})(SignupEvent);

export default connect(null, actions)(SignupEvent);
