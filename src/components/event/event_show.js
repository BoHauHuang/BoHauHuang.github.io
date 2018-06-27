import React, { Component } from 'react';
import * as editActions from '../../actions/EventAction';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class Events extends Component{

	componentWillMount() {
			this.props.fetchEvent(this.props.match.params.id);
			this.props.fetchTeams();
	}
	renderEventName(){
		if(this.props.targetevent){
			const event_name = this.props.targetevent.name;
			return(
				<h3>{event_name}</h3>
			);
		}

	}
	renderEvent() {
		 if (this.props.targetevent) {
			const event_id = this.props.targetevent.id;
			const description = this.props.targetevent.description;
			const rule = this.props.targetevent.rule;
 			const mem_min = this.props.targetevent.member_min;
  		const maximum = this.props.targetevent.team_max;
 			const joined_people = this.props.teams.length;
  		const capacity = (maximum-joined_people);
			return(
			<ul className="list-group-item" key={event_id}>
				<li>活動簡介: {description} </li>
				<li>活動規則: {rule} </li>
			 	<li>團隊人數下限: {mem_min}</li>
			 	<li>可報名隊伍數: {capacity}/{maximum}</li>

			<Link to={event_id+"/join"}><button className="btn btn-primary btn-sm">Join!</button></Link>
			<button className="btn btn-secondary btn-sm" onClick={ ()=> {history.back(-1);}}>Back</button>
			</ul>
		 )
		 }
		else{
			<a>Loading...</a>
		}
	}

	render() {
    return (
			<div>
				<div className="row mb-4 mt-4">
					<div className="col">
        		{this.renderEventName()}
					</div>
					<div className="col text-right">
            <Link to={"/event/edit"} className="btn btn-warning">
              編輯活動
            </Link>
          </div>
					</div>
        <ul className="list-group">
          {this.renderEvent()}
        </ul>
			</div>
    );
  }
}
function mapStateToProps(state){
	return {
		targetevent: state.event.event,
		teams: state.event.teams
	};
}

export default connect(mapStateToProps,editActions)(Events);
