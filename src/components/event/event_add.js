import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as editActions from "../../actions/EventAction";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Datetime from "react-datetime";
import moment from "moment";

class AddEvent extends Component {
  add_event_Submit({
    name,
    description,
    rule,
    teamMax,
    memMin,
    reg_start,
    reg_end
  }) {
    console.log({
      name,
      description,
      rule,
      teamMax,
      memMin,
      reg_start,
      reg_end
    });
    this.props.addEvent({
      name,
      description,
      rule,
      teamMax,
      memMin,
      reg_start,
      reg_end
    });
    //this.props.history.push('/event');
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
      <div>
        <h3 className="mb-4 mt-4">建立新活動</h3>
        <form onSubmit={handleSubmit(this.add_event_Submit.bind(this))}>
          <fieldset className="form-group">
            <Field
              name="name"
              type="text"
              component={this.renderInput}
              size="col-form-label-lg"
              placeholder="活動名稱"
            />
            <Field
              name="description"
              type="description"
              component={this.renderTextarea}
              size="col-form-label"
              rows="4"
              label="活動簡介"
              placeholder="關於此活動..."
            />
            <Field
              name="rule"
              type="text"
              component={this.renderTextarea}
              size="col-form-label"
              label="活動規則"
              rows="3"
              placeholder="規則..."
            />
            <Field
              name="teamMax"
              component={this.renderInput}
              type="number"
              size="col-form-label"
              label="參加隊伍上限: "
            />
            <Field
              name="memMin"
              component={this.renderInput}
              type="number"
              size="col-form-label"
              label="團隊人數下限: "
            />
            <Field
              name="reg_start"
              component={this.renderInput}
              type="datetime-local"
              label="報名開始時間: "
            />
            <Field
              name="reg_end"
              component={this.renderInput}
              type="datetime-local"
              label="報名截止時間: "
            />
          </fieldset>

          <button action="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            action="Cancel"
            className="btn btn-secondary"
            onClick={() => {
              history.back(-1);
            }}
          >
            Cancel
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
  if (!values.teamMax) {
    errors.teamMax = "請輸入隊伍上限";
  }
  if (!values.memMin) {
    errors.memMin = "請輸入團隊人數下限";
  }
  if (!values.reg_start) {
    errors.reg_start = "請輸入報名開始時間";
  }
  if (!values.reg_end) {
    errors.reg_end = "請輸入報名截止時間";
  }
  return errors;
};

export default connect(
  null,
  editActions
)(reduxForm({ form: "AddEvent", validate })(AddEvent));
