import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions/announcement";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class AnncouncementShow extends Component {
  componentWillMount() {
    this.props.fetchAnnouncement(this.props.match.params.id);
    this.props.fetchAnnouncements();
  }

  renderEditAnnouncement() {
    if (this.props.auth.isAdmin) {
      return (
        <div className="col text-right">
          <Link
            to={`/announcement/${this.props.post.id}/edit`}
            className="btn btn-secondary"
          >
            修改公告
          </Link>
        </div>
      );
    }
  }

  render() {
    if (this.props.post) {
      const post = this.props.post;
      return (
        <article>
          <div className="row mb-2 mt-4">
            <div className="col">
              <h3>{post.title}</h3>
            </div>
            {this.renderEditAnnouncement()}
          </div>
          <div className="row">
            <div className="col-sm-8">
              <div className="announcement-meta">
                <i className="w-20 fas fa-clock" /> 公告時間：{moment(
                  post.announce_start
                ).format("YYYY/MM/DD")}{" "}
                ～ {moment(post.announce_end).format("YYYY/MM/DD")}
              </div>
              <div className="mt-4 content">{post.description}</div>
            </div>
          </div>
        </article>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    post: state.announcement.objs[state.announcement.currentAnnouncementId],
    auth: {
      isAdmin: state.auth.sessionUser.isAdmin
    }
  };
};

export default connect(
  mapStateToProps,
  actions
)(AnncouncementShow);
