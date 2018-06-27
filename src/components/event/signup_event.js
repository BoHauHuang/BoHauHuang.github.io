import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as editActions from '../../actions/EventAction';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from "moment";

class Events extends Component {
  componentWillMount(){
    const event_id = this.props.match.params.id;
    this.props.fetchEvent(event_id);
  }

  renderInput({
    input,
    label,
    type,
    size,
    placeholder,
    meta: { touched, error }
  }) {
		return (
      <div className="form-group">
        { label ? <label>{label}</label> : ''}
        <div>
          <input
            {...input}
            className={
              "form-control " +
              (touched ? (!error ? "is-valid " : "is-invalid ") : "") +
              size
            }
            placeholder={placeholder}
            type={type}
          />
          <div className="valid-feedback">{touched && !error}</div>
          <div className="invalid-feedback">
            {touched && error && <span>{error}</span>}
          </div>
        </div>
      </div>
		);
	}
  register_team(team_name){
    if(this.props.targetevent){
      const event_id = this.props.targetevent.id;
      const name = team_name.team_name;
      console.log(name);
      this.props.RegisterTeam({name, event_id});
    }
  }

  renderEventName(){
    if(this.props.targetevent){
			const event_name = this.props.targetevent.name;
			return event_name;
  }
}

  render(){
    const {handleSubmit} = this.props;
    return(
      <div>
        <div>
          <h3 className="mb-4 mt-4">報名活動-{this.renderEventName()}</h3>
        </div>
        <form onSubmit={handleSubmit(this.register_team.bind(this))}>
          <fieldset className="form-group">
            <Field name="team_name" type="text" component={this.renderInput} size="col-form-label-lg" label="隊伍名稱" placeholder="隊伍名稱" />
          </fieldset>
          <button action="submit" className="btn btn-primary">Submit</button>
          <button action="cancel" className="btn btn-success">Cancel</button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.team_name) {
    errors.team_name = "請輸入隊伍名稱";
  }
  return errors;
}

function mapStateToProps(state){
	return {
		targetevent: state.event.event,
		teams: state.event.teams
	};
}
export default connect(mapStateToProps, editActions)(reduxForm({form: "SignupEvent", validate})(Events));
