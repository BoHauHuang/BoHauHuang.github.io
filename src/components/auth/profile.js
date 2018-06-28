import React, { Component } from "react";
import * as editActions from "../../actions/EventAction";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Profile extends Component{
  componentWillMount() {
    this.props.fetchEvents();
    this.props.fetchTeams();
  }

  renderGender(){
    if(this.props.userName){
      if(!this.props.userGender){
        return "男";
      }
      else{
        return "女";
      }
    }
  }
  renderJoinedEvent(){
    if(this.props.userTeamIds){
    const teamIds = this.props.userTeamIds;
      return teamIds.map(team_id => {
        if(this.props.isTeamLoaded && this.props.isEventLoaded){
          const team = this.props.teamObjs[team_id];
          const event = this.props.eventObjs[team.event_id];
          return(
            <div><h5><li><Link to={"/event/" + event.id}>{event.name}</Link></li></h5></div>
          );
        }
        if(!this.props.userTeamIds.length){
          return(
            <div><h6>你還沒有報名過任何活動哦！快去<Link to={"/event/"}>活動列表</Link>看看有沒有喜歡的活動吧！</h6></div>
          )
        }
      })
    }
  }

  renderProfile(){
    if(this.props.userName){
      return(
        <div>
          <div className="col">
            <h5>使用者名稱: {this.props.userName}</h5>
          </div>
          <div className="col">
            <h5>學號: {this.props.userId}</h5>
          </div>
          <div className="col">
            <h5>性別: {this.renderGender()}</h5>
          </div>
          <div className="col mt-3">
            <h5>我的活動: {this.renderJoinedEvent()}</h5>
          </div>
        </div>
      );
    }
    else{
      return(
        <div><h4>Loading...</h4></div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="row mb-4 mt-4">
          <div className="col">
            <h3>我的資料</h3>
          </div>
        </div>
        {this.renderProfile()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userName: state.auth.sessionUser.name,
    userId: state.auth.sessionUser.username,
    userGender: state.auth.sessionUser.gender,

    userObjs: state.auth.users.objs,
    userTeamIds: state.auth.sessionUser.teamIds,
    eventObjs: state.event.event.objs,
    teamObjs: state.event.team.objs,
    isTeamLoaded: state.event.isTeamLoaded,
    isEventLoaded: state.event.isEventLoaded
  };
}


export default connect(mapStateToProps,editActions)(Profile);
