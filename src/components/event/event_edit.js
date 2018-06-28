import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as editActions from "../../actions/EventAction";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Datetime from "react-datetime";
import moment from "moment";

class EditEvent extends Component {
  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.id);
    this.props.fetchEvents();
  }

  handleEventSubmit({
    name,
    description,
    rule,
    team_max,
    member_min,
    member_max,
    regist_start,
    regist_end,
    event_start,
    event_end
  }) {
    this.props.updateEvent({
      event_id: this.props.match.params.id,
      name,
      description,
      rule,
      team_max,
      member_min,
      member_max,
      regist_start,
      regist_end,
      event_start,
      event_end
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

  renderTextarea({
    input,
    label,
    type,
    size,
    rows,
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
            rows={rows}
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
      <div className="mb-4">
        <h3 className="mb-4 mt-4">編輯活動</h3>
        <form onSubmit={handleSubmit(this.handleEventSubmit.bind(this))}>
          <Field
            name="name"
            type="text"
            component={this.renderInput}
            size="col-form-label-lg"
            placeholder="活動名稱"
          />
          <div className="row">
            <div className="col">
              <Field
                name="event_start"
                component={this.renderInput}
                type="input"
                label="活動開始時間"
              />
            </div>
            <div className="col">
              <Field
                name="event_end"
                component={this.renderInput}
                type="input"
                label="活動結束時間"
              />
            </div>
          </div>
          <Field
            name="description"
            type="description"
            component={this.renderTextarea}
            size="col-form-label"
            rows="6"
            label="活動簡介"
            placeholder="這個活動是關於什麼？"
          />
          <Field
            name="rule"
            type="text"
            component={this.renderTextarea}
            size="col-form-label"
            label="活動規則"
            rows="6"
            placeholder="規則..."
          />
          <div className="row">
            <div className="col">
              <Field
                name="team_max"
                component={this.renderInput}
                type="number"
                size="col-form-label"
                label="參加隊伍上限"
              />
            </div>
            <div className="col">
              <Field
                name="member_min"
                component={this.renderInput}
                type="number"
                size="col-form-label"
                label="團隊人數下限"
              />
            </div>
            <div className="col">
              <Field
                name="member_max"
                component={this.renderInput}
                type="number"
                size="col-form-label"
                label="團隊人數上限"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Field
                name="regist_start"
                component={this.renderInput}
                type="input"
                label="報名開始時間"
              />
            </div>
            <div className="col">
              <Field
                name="regist_end"
                component={this.renderInput}
                type="input"
                label="報名截止時間"
              />
            </div>
          </div>
          <button action="submit" className="btn btn-primary btn-lg">
            送出
          </button>{" "}
          <button
            action="Cancel"
            className="btn btn-secondary btn-lg"
            onClick={() => {
              history.back(-1);
            }}
          >
            取消操作
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "請輸入活動名稱";
  }
  if (!values.description) {
    errors.description = "請輸入活動簡介";
  }
  if (!values.rule) {
    errors.rule = "請輸入活動規則";
  }
  if (!values.team_max) {
    errors.team_max = "請輸入隊伍數量上限";
  }
  if (!values.member_min) {
    errors.member_min = "請輸入團隊人數下限";
  }
  if (!values.member_max) {
    errors.member_max = "請輸入團隊人數上限";
  }
  if (values.member_max && values.member_max < values.member_min) {
    errors.member_max = "團隊人數下限不可以大於上限";
  }
  if (!values.regist_start) {
    errors.regist_start = "請輸入報名開始時間";
  }
  if (!values.regist_end) {
    errors.regist_end = "請輸入報名截止時間";
  }
  if (values.regist_end && values.regist_end < values.regist_start) {
    errors.regist_end = "報名截止時間不可高於報名開始時間";
  }
  if (!values.event_start) {
    errors.event_start = "請輸入活動開始時間";
  }
  if (!values.event_end) {
    errors.event_end = "請輸入活動截止時間";
  }
  if (values.event_end && values.event_end < values.event_start) {
    errors.event_end = "活動結束時間不可早於活動開始時間";
  }
  return errors;
};

const mapStateToProps = state => {
  return {
    auth: {
      isAdmin: state.auth.sessionUser.isAdmin
    },
    initialValues: state.event.event.objs[state.event.currentEventId]
  };
};

export default connect(
  mapStateToProps,
  editActions
)(reduxForm({ form: "EditEvent", validate })(EditEvent));
