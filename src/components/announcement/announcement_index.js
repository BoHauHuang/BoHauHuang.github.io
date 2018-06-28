import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions/announcement";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AnncouncementIndex extends Component {
  componentWillMount() {
    this.props.fetchAnnouncements();
  }

  renderPosts() {
    if (this.props.postIds) {
      return this.props.postIds.map(id => {
        const post = this.props.postObjs[id];
        return (
          <article className="bdb mb-2" key={id}>
            <Link to={"/announcement/" + id}>
              <h4>{ post.title }</h4>
            </Link>
            { post.created_at }
            <p>{post.description}</p>
          </article>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  }

  renderAddAnnouncement(){
    if(this.props.auth.isAdmin){
      return(
        <Link to={"/announcement/create"} className="btn btn-primary">建立新公告</Link>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="row mb-4 mt-4">
          <div className="col">
            <h3 className="">公告</h3>
          </div>
          <div className="col text-right">
            {this.renderAddAnnouncement()}
          </div>
        </div>
        <div>
          {this.renderPosts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postIds: state.announcement.ids,
    postObjs: state.announcement.objs,
    auth: {
      isAdmin: state.auth.sessionUser.isAdmin
    }

  };
}

export default connect(
  mapStateToProps,
  actions
)(AnncouncementIndex);
