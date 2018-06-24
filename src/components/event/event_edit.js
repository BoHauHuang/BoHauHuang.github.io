import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as editActions from '../../actions/EventAction';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class Events extends Component {
  componentWillMount() {
      console.log("ID:",this.props.match.params.id);
      this.props.fetchEvent(this.props.match.params.id);
  }
  update_event_Submit({name,teamMax,memMin, datetime}) {
    console.log({name,teamMax,memMin, datetime});
    const event_id = this.props.match.params.id;
    this.props.updateEvent({event_id,name,teamMax,memMin, datetime});
    this.props.history.push('/event');
  }
  renderEvent(){
    if(this.props.targetevent){
      const {handleSubmit} = this.props;

      const event_name = this.props.targetevent.name;
      const team_Max = this.props.targetevent.member_min;
      const mem_Min = this.props.targetevent.team_max;
      const date_time = this.props.targetevent.time;

      return(
        <form onSubmit={handleSubmit(this.update_event_Submit.bind(this))}>
          <fieldset className="form-group">
            <label>Name: </label>
            <Field name="name" className="form-control" component="input" placeholder={event_name} type="text"/>
            <label>Team maximum: </label>
            <Field name="teamMax" className="form-control" component="input" placeholder={team_Max} type="text"/>
            <label>Member minimum: </label>
            <Field name="memMin" className="form-control" component="input" placeholder={mem_Min} type="text" />
            <label>Time: </label>
            <Field name="datetime" className="form-control" component="input" placeholder={date_time} type="datetime-local"/>
          </fieldset>

        <button action="submit" className="btn btn-primary">Done</button>
      </form>
      );
    }
    else{
			<a>Connecting...</a>
		}
  }
  render(){

    return(
      <div>{this.renderEvent()}</div>
    );
  }
}
function mapStateToProps(state){
	return {
		targetevent: state.event.event,
		teams: state.event.teams
	};
}
export default connect(mapStateToProps, editActions)(reduxForm({form: "EditEvent"})(Events));
