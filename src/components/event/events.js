import React, { Component } from "react";
import * as editActions from "../../actions/EventAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

class Events extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }

  renderMessage() {
    if (this.props.message) {
      return (
        <div
          className={`mt-4 alert alert-${this.props.message.type}`}
          role="alert"
        >
          {this.props.message.msg}
        </div>
      );
    }
  }

  renderEvents() {
    if (this.props.events) {
      return this.props.events.map(event => {
        return (
          <tr key={event.id} className="event">
            <td>
              <strong className="event-title">
                <Link to={"/event/" + event.id}>{event.name}</Link>
              </strong>
            </td>
            <td>{event.excerpt}</td>
            <td>
              {moment(event.regist_start).format("YYYY/MM/DD HH:mm")} ～{" "}
              {moment(event.regist_end).format("YYYY/MM/DD HH:mm")}
            </td>
            <td>
              {this.props.auth.isAdmin ? (
                <span>
                  <Link
                    to={"/event/" + event.id + "/status"}
                    className="btn btn-info btn-sm"
                  >
                    報名狀況
                  </Link>{" "}
                  <Link
                    to={"/event/" + event.id + "/edit"}
                    className="btn btn-secondary btn-sm"
                  >
                    編輯
                  </Link>
                </span>
              ) : (
                <Link
                  to={"/event/" + event.id}
                  className="btn btn-primary btn-sm"
                >
                  報名
                </Link>
              )}
            </td>
          </tr>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  }

  renderCreateEvent() {
    if (this.props.auth.isAdmin) {
      return (
        <div className="col text-right">
          <Link to={"/event/add"} className="btn btn-primary">
            建立新活動
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderMessage()}
        <div className="row mb-4 mt-4">
          <div className="col">
            <h3>體育活動</h3>
          </div>
          
          <div className="col text-right">
            {this.renderCreateEvent()}
          </div>
        </div>
        <table className="table event-list">
          <thead>
            <tr>
              <th>活動名稱</th>
              <th>活動概要</th>
              <th>
                <i className="fas fa-calendar w-20" /> 報名期間
              </th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>{this.renderEvents()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.event.event.ids.map(id => {
      return state.event.event.objs[id];
    }),
		auth: {
      isAdmin: state.auth.sessionUser.isAdmin
    }
  };
}

export default connect(
  mapStateToProps,
  editActions
)(Events);
