import React, { Component } from "react";
import * as editActions from "../../actions/EventAction";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class EventParticipate extends Component {
  componentWillMount() {
    this.props.fetchEvents();
    this.props.fetchTeams();
  }

  renderVerify(team) {
    console.log(team);
    console.log(team.verify);
    if (team.verify) {
      return (
        <div className="mt-2">
        
          <i className="fas fa-clock w-20" /> 送出報名時間：{moment(
            team.created_at
          ).format("YYYY/MM/DD HH:mm:ss")}
          <div>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (confirm("確定要放棄參賽嗎？")) {
                  const team_id = team.id;
                  this.props.deleteParticipate(team_id);
                }
              }}
            >
              取消報名
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-2">
        
        <Link
              to={"/event/participation/" + team.id}
              className="btn btn-warning"
            >
              修改報名
            </Link>{" "}
          <button
            className="btn btn-primary"
            onClick={() => this.props.verifyTeam(team, team.id)}
          >
            送出報名表
          </button>
        </div>
      );
    }
  }

  renderParticipations() {
    const teamIds = this.props.userTeamIds;
    return teamIds.map(team_id => {
      if (this.props.isTeamLoaded && this.props.isEventLoaded) {
        const team = this.props.teamObjs[team_id];
        //console.log(team);
        //console.log(this.props.eventObjs);
        const event = this.props.eventObjs[team.event_id];
        //console.log(event);
        return (
          <div className="card mb-3">
            <h5 className="card-header">
              報名表 －
              <Link to={"/event/" + event.id}>{event.name}</Link>
              {"  "}
            </h5>
            
            <div className="card-body">
              <ul className="list-unstyled mt-ˋ">
                <li>
                  <i className="fas fa-info-circle w-20" /> 報名表統一編號：{
                    team.id
                  }
                </li>
                <li>
                  <i className="fas fa-info-circle w-20" /> 隊名：{team.name}
                </li>
                <li>
                  <i className="fas fa-users w-20" /> 隊員：
                  <ul>
                    {team.userIds.map(user_id => {
                      return (
                        <li>
                          {this.props.userObjs[user_id].username} －{" "}
                          {this.props.userObjs[user_id].name}{" "}
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>{this.renderVerify(team)}</li>
              </ul>
            </div>
          </div>
        );
      } else {
        return (
          <div className="card mb-2">
            <div className="card-body">
              <div className="card-title">Loading...</div>
              Loading...
            </div>
          </div>
        );
      }
    });
  }

  render() {
    if (this.props.userTeamIds) {
      if (this.props.userTeamIds.length > 0) {
        return (
          <article className="mt-4 pb-4">
            <header className="mb-4">
              <div className="row">
                <div className="col">
                  <h3 className="event-title">我的報名紀錄</h3>
                </div>
              </div>
            </header>
            <div className="content">{this.renderParticipations()}</div>
          </article>
        );
      } else {
        return (
          <article className="mt-4 pb-4">
            <header className="mb-4">
              <div className="row">
                <div className="col">
                  <h3 className="event-title">報名紀錄</h3>
                </div>
              </div>
            </header>
            <div className="content">
              你還沒有報名過任何活動哦！快去<Link to={"/event/"}>活動列表</Link>看看有沒有喜歡的活動吧！
            </div>
          </article>
        );
      }
    } else {
      return <div>Loading...</div>;
    }
  }
}
function mapStateToProps(state) {
  return {
    userObjs: state.auth.users.objs,
    userTeamIds: state.auth.sessionUser.teamIds,
    eventObjs: state.event.event.objs,
    teamObjs: state.event.team.objs,
    isTeamLoaded: state.event.isTeamLoaded,
    isEventLoaded: state.event.isEventLoaded,
    auth: {
      isAdmin: state.auth.isAdmin
    }
  };
}

export default connect(
  mapStateToProps,
  editActions
)(EventParticipate);
