import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions";
import { connect } from "react-redux";

class Signin extends Component {
  handleFormSubmit({ username, password }) {
    this.props.signinUser({ username, password });
  }

  renderInput({ input, label, type, placeholder, meta: { touched, error } }) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">
          <input
            {...input}
            className={
              "form-control" +
              (touched ? (!error ? " is-valid" : " is-invalid") : "")
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

  renderMessage() {
    if (this.props.message) {
      return (
        <div className={`mt-4 alert alert-${this.props.message.type}`} role="alert">
          {this.props.message.msg}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        {this.renderMessage()}
        <h3 className="mb-4 mt-4">登入系統</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="username"
            type="text"
            component={this.renderInput}
            label="學號（工號）"
            placeholder="你的學號（工號）"
          />
          <Field
            name="password"
            type="password"
            component={this.renderInput}
            label="密碼"
            placeholder="請輸入密碼"
          />
          <button action="submit" className="btn btn-primary">
            登入
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "請輸入你的學號（工號）";
  }
  if (!values.password) {
    errors.password = "請輸入你的密碼";
  }
  return errors;
};

const mapStateToProps = state => {
  return {
    message: state.auth.message
  };
};

Signin = reduxForm({
  form: "signin",
  validate
})(Signin);

export default connect(
  mapStateToProps,
  actions
)(Signin);
