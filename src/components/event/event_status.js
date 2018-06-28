import React, { Component } from "react";
import * as editActions from "../../actions/EventAction";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class EventParticipate extends Component {
  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.id);
    this.props.fetchEvents();
    this.props.fetchTeams();
  }

  renderParticipations() {
    const teamIds = this.props.eventTeamIds;
    return teamIds.map((team_id, index) => {
      if (this.props.isTeamLoaded && this.props.isEventLoaded) {
        const team = this.props.teamObjs[team_id];
        console.log(team);
        console.log(this.props.eventObjs);
        const event = this.props.eventObjs[team.event_id];
        console.log(event);
        return (
          <div className="card mb-3">
            <h5 className="card-header">報名表 #{index + 1}</h5>
            <div className="card-body">
              <ul className="list-unstyled mt-ˋ">
                <li>報名表統一編號：{team_id}</li>
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
    if (this.props.eventTeamIds) {
      if (this.props.eventTeamIds.length > 0) {
        return (
          <article className="mt-4 pb-4">
            <header className="mb-4">
              <div className="row">
                <div className="col">
                  <h3 className="event-title">
                    報名狀況 － {this.props.event.name} ({this.props.eventTeamIds.length} / {this.props.event.team_max})
                  </h3>
                </div>
              </div>
            </header>
            <div className="content">{this.renderParticipations()}</div>
            <Link to={"/event/" + this.props.event.id} className="btn btn-primary btn-block">回活動網頁</Link>
          </article>
        );
      } else {
        return (
          <article className="mt-4 pb-4">
            <header className="mb-4">
              <div className="row">
                <div className="col">
                  <h3 className="event-title">
                    報名狀況
                  </h3>
                </div>
              </div>
            </header>
            <div className="content">本活動目前還沒有人報名</div>
          </article>
        );
      }
    } else {
      return <div>Loading...</div>;
    }
  }
}
function mapStateToProps(state, ownProp) {
  return {
    userObjs: state.auth.users.objs,
    eventTeamIds: state.event.team.ids.filter(
      id => state.event.team.objs[id].event_id == ownProp.match.params.id
    ),
    eventObjs: state.event.event.objs,
    teamObjs: state.event.team.objs,
    event: state.event.event.objs[state.event.currentEventId],
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
