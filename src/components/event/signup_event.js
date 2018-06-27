import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as editActions from '../../actions/EventAction';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from "moment";

class Events extends Component {
  componentWillMount(){
    this.props.fetchEvent(this.props.match.params.id);
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

  register_team({
      team_name,
      leader,
      member1,
      member2
    }){
      this.props.FetchPlayers({leader, member1, member2});
      console.log({leader, member1, member2});
      this.props.FetchTeamID({team_name});
      this.register_player();
  }

  register_player(){
    if(this.props.myteam){
      const team_id = this.props.myteam.id;
      this.props.RegisterPlayer({team_id});
    }
  }

  renderEventName(){
    if(this.props.targetevent){
			const event_name = this.props.targetevent.name;
			return event_name;
  }
}
  renderMembers(minimum){
    if(this.props.targetevent){
      var count = 1;
      var member_array = [];
      member_array.push(<Field name="leader" type="text" component={this.renderInput} label="隊長" placeholder="隊長學號" />);
      minimum--;
      while(minimum--){
        member_array.push(<Field name={"member"+count} type="text" component={this.renderInput} label={"隊員"+count} placeholder="隊員學號" />);
        count++;
      }
      return member_array;
    }
  }
  render(){
    if(this.props.targetevent){
    const {handleSubmit} = this.props;
    return(
      <div>
        <div>
          <h3 className="mb-4 mt-4">報名活動-{this.renderEventName()}</h3>
        </div>
        <form onSubmit={handleSubmit(this.register_team.bind(this))}>
          <fieldset className="form-group">
            <Field name="team_name" type="text" component={this.renderInput} size="col-form-label-lg" label="隊伍名稱" placeholder="隊伍名稱" />
            {this.renderMembers(this.props.targetevent.member_min)}
          </fieldset>
          <button action="submit" className="btn btn-primary">Submit</button>
          <button action="cancel" className="btn btn-success" onClick={ ()=> {history.back(-1);}}>Cancel</button>
        </form>
      </div>
    );
  }
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
		teams: state.event.teams,
    players: state.event.player,
    myteam: state.event.myteam
	};
}
export default connect(mapStateToProps, editActions)(reduxForm({form: "SignupEvent", validate})(Events));
