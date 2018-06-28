import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions/announcement";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AnncouncementShow extends Component {
  componentWillMount() {
    this.props.fetchAnnouncement(this.props.match.params.id);
    this.props.fetchAnnouncements();
  }

  render() {
    const post = this.props.objs[this.props.currentAnnouncementId];
    if (post) {
      return (
        <article>
          <div className="row mb-4 mt-4">
            <div className="col">
              <h3>{post.title}</h3>
            </div>
            <div className="col text-right">
              <Link
                to={`/announcement/edit/${post.id}`}
                className="btn btn-secondary"
              >
                修改公告
              </Link>
            </div>
          </div>
          <div>
            {post.announce_start} ~ {post.announce_end}
          </div>
          <div>{post.description}</div>
        </article>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}



const mapStateToProps = state => {
  return {
    currentAnnouncementId: state.announcement.currentAnnouncementId,
    objs: state.announcement.objs
  };
};

export default connect(
  mapStateToProps,
  actions
)(AnncouncementShow);
