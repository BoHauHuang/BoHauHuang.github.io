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
			return event_name;
		}
	}
	renderEditEvent(){
		if(this.props.targetevent && this.props.auth.role_id){
			const event_id = this.props.targetevent.id;
			return(
				<Link to={"/event/"+event_id+"/edit"} className="btn btn-warning">
					編輯活動
				</Link>
			)
		}
	}
	renderDeleteEvent(){
		if(this.props.auth.role_id){
			return(
				<button className="btn btn-danger sm" onClick = {()=>{this.props.deleteEvent(this.props.targetevent.id)}}> 刪除活動 </button>
			)
		}
	}
	renderEvent() {
		 if (this.props.targetevent) {
			const event_id = this.props.targetevent.id;
			const description = this.props.targetevent.description;
			const rule = this.props.targetevent.rule;
 			const mem_min = this.props.targetevent.member_min;
  		const maximum = this.props.targetevent.team_max;

  		const capacity = (maximum);
			return(
			<ul className="list-group-item" key={event_id}>
				<li>活動簡介: {description} </li>
				<li>活動規則: {rule} </li>
			 	<li>最少團隊人數: {mem_min}</li>
			 	<li>剩餘可報名隊伍數: {capacity}/{maximum}</li>

			<Link to={"/event/"+event_id+"/join"} className="btn btn-primary btn-sm">Join!</Link>
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
        		<h3 className="md-4 mt-4">活動名稱 - {this.renderEventName()}   {this.renderEditEvent()}  {this.renderDeleteEvent()}</h3>
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
		teams: state.event.teams,
		auth: {
      role_id: state.auth.role_id
		}
	};
}

export default connect(mapStateToProps,editActions)(Events);
