import React, { Component } from "react";
import * as editActions from "../../actions/EventAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

class Events extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }

  renderEvents() {
    if (this.props.events) {
      return this.props.events.map(event => {
        return (
          <article key={event.id} className="event mb-2 mb-4">
            <h4 className="event-title"><Link to={"/event/" + event.id}>{event.name}</Link></h4>
            <p className="event-excerpt">{event.excerpt}</p>
            <span>
              <i className="fas fa-calendar w-20" /> 開放報名時間：{moment(
                event.regist_start
              ).format("YYYY/MM/DD HH:mm")}{" "}
              ～ {moment(event.regist_end).format("YYYY/MM/DD HH:mm")}
            </span>
          </article>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    return (
      <div>
        <div className="row mb-4 mt-4">
          <div className="col">
            <h3>體育活動</h3>
          </div>
          <div className="col text-right">
            <Link to={"/event/add"} className="btn btn-primary">
              建立新活動
            </Link>
          </div>
        </div>
        <div className="event-list">{this.renderEvents()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.event.event.ids.map(id => {
      return state.event.event.objs[id];
    })
  };
}

export default connect(
  mapStateToProps,
  editActions
)(Events);
