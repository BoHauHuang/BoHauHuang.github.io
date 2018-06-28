import React, { Component } from "react";
import * as editActions from "../../actions/EventAction";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class Events extends Component {
  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.id);
    this.props.fetchEvents();
    this.props.fetchTeams();
  }
  renderControlButtons() {
    if (this.props.event && this.props.auth.isAdmin) {
      const { id } = this.props.event;
      return (
        <div className="text-right">
          <Link to={"/event/" + id + "/edit"} className="btn btn-warning">
            編輯活動
          </Link>{" "}
          <button
            className="btn btn-danger sm"
            onClick={() => {
              this.props.deleteEvent(id);
            }}
          >
            刪除活動
          </button>
        </div>
      );
    }
  }
  // renderEvent() {

  //     const event_id = this.props.event.id;
  //     const description = this.props.event.description;
  //     const rule = this.props.event.rule;
  //     const mem_min = this.props.event.member_min;
  //     const maximum = this.props.event.team_max;

  //     const capacity = maximum;
  //     return (
  //       <ul className="list-group-item" key={event_id}>
  //         <li>活動簡介: {description} </li>
  //         <li>活動規則: {rule} </li>
  //         <li>最少團隊人數: {mem_min}</li>
  //         <li>
  //           剩餘可報名隊伍數: {capacity}/{maximum}
  //         </li>

  //         <Link
  //           to={"/event/" + event_id + "/join"}
  //           className="btn btn-primary btn-sm"
  //         >
  //           Join!
  //         </Link>
  //         <button
  //           className="btn btn-secondary btn-sm"
  //           onClick={() => {
  //             history.back(-1);
  //           }}
  //         >
  //           Back
  //         </button>
  //       </ul>
  //     );
  //   } else {
  //     <a>Loading...</a>;
  //   }
  // }

  renderRegisterButton() {
    const { id, regist_start, regist_end } = this.props.event;
    return (
      <div className="mt-4">
        <div className="text-center">
          <Link
            to={"/event/" + id + "/join"}
            className="btn btn-primary btn-lg"
          >
            立即報名
          </Link>
          <div className="text-success mt-2"> 剩餘 20 隊</div>
        </div>
      </div>
    );
  }

  render() {

    if (this.props.event) {
      const {
        id,
        name,
        description,
        rule,
        member_min,
        member_max,
        team_max,
        regist_start,
        regist_end
      } = this.props.event;
      return (
        <article className="card mt-4 pb-4">
          <div className="card-body">
            <header className="mb-4">
              <div className="row">
                <div className="col">
                  <h3 className="md-4 event-title">{name}</h3>
                </div>
                <div className="col">{this.renderControlButtons()}</div>
              </div>
            </header>
            <div className="content">
              {description}
              <h4 className="mt-4 mb-2">報名資訊</h4>
              <ul className="list-unstyled">
                <li>
                  <i className="fas fa-calendar w-20 mr-1" /> 開放報名時間：{moment(
                    regist_start
                  ).format("YYYY/MM/DD HH:mm")}{" "}
                  ～ {moment(regist_end).format("YYYY/MM/DD HH:mm")}。
                </li>
                <li>
                  <i className="fas fa-users w-20 mr-1" /> 隊伍人數限制：最少{" "}
                  {member_min} 人，最多 {member_max} 人。
                </li>
                <li>
                  <i className="fas fa-exclamation-circle w-20 mr-1" />{" "}
                  隊伍數量：上限為 {member_max} 隊。
                </li>
              </ul>
              {this.renderRegisterButton()}
            </div>
          </div>
        </article>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
function mapStateToProps(state) {
  return {
    event: state.event.event.objs[state.event.currentEventId],
    auth: {
      isAdmin: state.auth.isAdmin
    }
  };
}

export default connect(
  mapStateToProps,
  editActions
)(Events);
