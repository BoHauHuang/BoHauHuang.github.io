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
    console.log({name});
    this.props.RegisterTeam({name});
  }

  get_events(){
    this.props.Get_Availble_Events();
  }
  render(){
    const {handleSubmit} = this.props;
    return(
        <form onSubmit={handleSubmit(this.register_team.bind(this))}>
          <fieldset className="form-group">
            <label>Team Name: </label>
            <Field name="name" component={this.renderInput} type="text" />
            <div className="sign_up_event">
              <label>Events:</label>
              <select className="form-control" id="exampleFormControlSelect1" component = {this.renderInput} type="text">
                {this.get_events()}
              </select>
            </div>
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
