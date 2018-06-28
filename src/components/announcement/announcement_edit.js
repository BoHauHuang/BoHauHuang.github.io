import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions/announcement";
import { connect } from "react-redux";
import Datetime from "react-datetime";
import moment from "moment";

const toSqlDate = time => moment(time).format("YYYY-MM-DD HH:mm:ss");

class AnnouncementEdit extends Component {
  componentWillMount() {
    console.log(this.props.match.params.id);
    this.props.fetchAnnouncement(this.props.match.params.id);
    this.props.fetchAnnouncements();
  }

  handleFormSubmit({ title, description, announce_start, announce_end }) {
    console.log(
      this.props.announcement.id,
      description,
      announce_start,
      announce_end
    );
    console.log(announce_start, toSqlDate(announce_start));

    const announcement_id = this.props.announcement.id;
    const announcement = {
      id: announcement_id,
      title,
      description,
      announce_start,
      announce_end
    };
    console.log(announcement);
    this.props.updateAnnouncement({
      id: announcement_id,
      announcement: { announcement }
    });
  }

  renderInput({
    input,
    label,
    type,
    size,
    placeholder,
    meta: { touched, error }
  }) {
    return (
      <div className="form-group">
        {label ? <label>{label}</label> : ""}
        <div>
          <input
            {...input}
            className={
              "form-control " +
              (touched ? (!error ? "is-valid " : "is-invalid ") : "") +
              size
            }
            placeholder={placeholder}
            type={type}
          />
          <div className="valid-feedback">{touched && !error}</div>
          <div className="invalid-feedback">
            {touched && error && <span>{error}</span>}
          </div>
        </div>
      </div>
    );
  }

  handleDelete() {
    if ( confirm("確定要刪除嗎？") ) {
      this.props.deleteAnnouncement(this.props.announcement.id);
    }
  }

  renderTextarea({
    input,
    label,
    type,
    size,
    placeholder,
    meta: { touched, error }
  }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <div>
          <textarea
            {...input}
            className={
              "form-control " +
              (touched ? (!error ? "is-valid " : "is-invalid ") : "") +
              size
            }
            placeholder={placeholder}
            type={type}
            rows="8"
          />
          <div className="valid-feedback">{touched && !error}</div>
          <div className="invalid-feedback">
            {touched && error && <span>{error}</span>}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.props.auth.isAdmin) {
      return (
        <div>
          <h3 className="mb-4 mt-4">修改公告</h3>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="row">
              <div className="col-md-8">
                <Field
                  name="title"
                  type="text"
                  component={this.renderInput}
                  size="col-form-label-lg"
                  placeholder="公告標題"
                />
                <Field
                  name="description"
                  type="description"
                  component={this.renderTextarea}
                  label="公告內容"
                  placeholder="寫點什麼吧⋯⋯"
                />
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">發佈</h5>
                    <Field
                      name="announce_start"
                      component={this.renderInput}
                      type="input"
                      label="公告開始時間"
                    />
                    <Field
                      name="announce_end"
                      component={this.renderInput}
                      type="input"
                      label="公告結束時間"
                    />
                    <div className="row justify-content-end align-self-end">
                      <div className="col">
                        <a
                          onClick={this.handleDelete.bind(this)}
                          className="btn btn-outline-danger btn-sm mr-2 mt-3"
                        >
                          刪除
                        </a>
                      </div>
                      <div className="col text-right">
                        <button
                          action="submit"
                          className="btn btn-primary btn-lg"
                        >
                          更新
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <div className="mt-4 alert alert-danger" role="alert">
            抱歉！你不是管理員不能看到這個頁面！
          </div>
        </div>
      );
    }
  }
}

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "請輸入公告標題";
  }
  if (!values.description) {
    errors.description = "請輸入公告內容";
  }
  if (!values.announce_start) {
    errors.announce_start = "請輸入公告開始時間";
  }
  if (!values.announce_end) {
    errors.announce_end = "請輸入公告結束時間";
  }
  if (values.announce_start && values.announce_start > values.announce_end) {
    errors.announce_end = "公告結束時間不能早於公告開始時間";
  }
  return errors;
};

const mapStateToProps = state => {
  return {
    announcement:
      state.announcement.objs[state.announcement.currentAnnouncementId],
    auth: {
      isAdmin: state.auth.sessionUser.isAdmin
    },
    initialValues:
      state.announcement.objs[state.announcement.currentAnnouncementId]
  };
};

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "AnnouncementEdit", validate })(AnnouncementEdit));
