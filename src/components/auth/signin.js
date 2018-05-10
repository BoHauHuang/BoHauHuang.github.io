
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/';
import { connect } from 'react-redux';

class Signin extends Component {

	handleFormSubmit({email, password}) {
		console.log(email, password);
		this.props.signinUser({email, password});
	}

	renderInput(field) {
		return (
			<div>
				<input className="form-control" {...field.input} type={field.type} />
			</div>
		);
	}

	render() {

		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email: </label>
					<Field name="email" component={this.renderInput} type="text" />
					<label>Password: </label>
					<Field name="password" component={this.renderInput} type="text" />
				</fieldset>
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

Signin = reduxForm({
  form: "signin",
})(Signin);
 
export default connect(null, actions)(Signin);
