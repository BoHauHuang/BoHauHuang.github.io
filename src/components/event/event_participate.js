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

  renderParticipations() {
    const teamIds = this.props.userTeamIds;
    return teamIds.map(team_id => {
      if (this.props.isTeamLoaded && this.props.isEventLoaded) {
        const team = this.props.teamObjs[team_id];
        console.log(team);
        console.log(this.props.eventObjs);
        const event = this.props.eventObjs[team.event_id];
        console.log(event);
        return (
          <div className="card mb-2">
            <h5 className="card-header">
              報名表 #{team_id}:{" "}
              <Link to={"/event/" + event.id}>{event.name}</Link>
            </h5>
            <div className="card-body">
              <ul className="list-unstyled mt-2">
                <li>
                  <i className="fas fa-info-circle w-20" /> 隊名：{team.name}
                </li>
                <li>
                  <i className="fas fa-users w-20" /> 隊員：{team.userIds.map(
                    user_id => {
                      return <span>{this.props.userObjs[user_id].name} </span>;
                    }
                  )}
                </li>
                <li>
                  <i className="fas fa-clock w-20" /> 送出報名時間：{moment(
                    team.created_at
                  ).format("YYYY/MM/DD HH:mm:ss")}
                </li>
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
                  <h3 className="md-4 mt-4 event-title">我的報名紀錄</h3>
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
