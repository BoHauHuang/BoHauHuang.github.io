import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions/announcement";
import { connect } from "react-redux";
import Datetime from "react-datetime";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class AnnouncementCreate extends Component {
  handleFormSubmit({ title, description, announce_start, announce_end }) {
    console.log(title, description);
    this.props.createAnnouncement({
      title,
      description,
      announce_start: moment(announce_start).toISOString(),
      announce_end: moment(announce_end).toISOString(),
      status: 1
    });
    this.props.history.push("/announcement");
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
          <h3 className="mb-4 mt-4">新增公告</h3>
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
                      placeholder="2018/01/01"
                    />
                    <Field
                      name="announce_end"
                      component={this.renderInput}
                      type="input"
                      label="公告結束時間"
                      placeholder="2018/12/31"
                    />
                    <div className="row justify-content-end align-self-end">
                      <div className="col">

                      </div>
                      <div className="col text-right">
                        <button
                          action="submit"
                          className="btn btn-primary btn-lg"
                        >
                          發佈
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

const mapStateToProp = state => {
  return {
    auth: {
      isAdmin: state.auth.sessionUser.isAdmin
    }
  };
};

export default connect(
  mapStateToProp,
  actions
)(reduxForm({ form: "AnnouncementCreate", validate })(AnnouncementCreate));
