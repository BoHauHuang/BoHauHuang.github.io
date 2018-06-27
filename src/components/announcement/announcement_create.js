import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions/announcement";
import { connect } from "react-redux";
import Datetime from "react-datetime";
import moment from "moment";

class AnnouncementCreate extends Component {
  handleFormSubmit({ title, description, announce_start, announce_end }) {
    console.log(title, description);
    this.props.createAnnouncement({ title, description, announce_start, announce_end });
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
        { label ? <label>{label}</label> : ''}
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
            rows="20"
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
                  <div className="form-group">
                    <label>公告開始時間</label>
                    <Datetime />
                  </div>
                  <div className="form-group">
                    <label>公告結束時間</label>
                    <Datetime />
                  </div>
                  <div className="row justify-content-end align-self-end">
                    <div className="col">
                      <button
                        action="submit"
                        className="btn btn-outline-secondary btn-sm mr-2 mt-3"
                      >
                        儲存草稿
                      </button>
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
  return errors;
};

export default connect(
  null,
  actions
)(reduxForm({ form: "AnnouncementCreate", validate })(AnnouncementCreate));
