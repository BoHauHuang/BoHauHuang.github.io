import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions/announcement";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class AnncouncementIndex extends Component {
  componentWillMount() {
    this.props.fetchAnnouncements();
  }

  renderPosts() {
    if (this.props.postObjs) {
      if(this.props.postIds){
      return this.props.postIds.map(id => {
        const post = this.props.postObjs[id];
        return (
          <article className="bdb mb-4" key={id}>
            <header>
              <Link to={"/announcement/"+id}>
                <h4 className="announcement-title">{post.title}</h4>
              </Link>
              <div className="announcement-meta">
                <i className="w-20 fas fa-clock" /> 公告時間：{moment(
                  post.announce_start
                ).format("YYYY/MM/DD")}{" "}
                ～ {moment(post.announce_end).format("YYYY/MM/DD")}
              </div>
            </header>
            <p className="mt-2">{post.description}</p>
          </article>
        );
      }).reverse().slice(0,3);
    } else {
      return <div>Loading...</div>;
    }
  }
  }

  renderCreateAnnouncement() {
    if (this.props.auth.isAdmin) {
      return (
        <Link to={"/announcement/create"} className="btn btn-primary">
          建立新公告
        </Link>
      );
    }
  }

  renderMessage() {
    if (this.props.msg == "delete_success") {
      return (
        <div className="mt-4 alert alert-success" role="alert">
          成功刪除文章。
        </div>
      );
    } else if (this.props.msg == "create_success") {
      return (
        <div className="mt-4 alert alert-success" role="alert">
          成功新增文章。
        </div>
      );
    } else if (this.props.msg == "update_success") {
      return (
        <div className="mt-4 alert alert-success" role="alert">
          成功修改文章。
        </div>
      );
    }
  }

  renderAuthMessage() {
    if (this.props.authMsg == "user_create_success") {
      return (
        <div className="mt-4 alert alert-warning" role="alert">
          我們已發送一封驗證信至您註冊的電子信向中，請先進行驗證後再行登入。
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderMessage()}
        {this.renderAuthMessage()}
        <div className="row mb-4 mt-4">
          <div className="col">
            <h3 className="">最新公告</h3>
          </div>
          <div className="col text-right">
            {this.renderCreateAnnouncement()}
          </div>
        </div>
        <div>{this.renderPosts()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postIds: state.announcement.ids,
    postObjs: state.announcement.objs,

    msg: state.announcement.msg,
    authMsg: state.auth.msg,
    auth: {
      isAdmin: state.auth.sessionUser.isAdmin
    }
  };
}

export default connect(
  mapStateToProps,
  actions
)(AnncouncementIndex);
