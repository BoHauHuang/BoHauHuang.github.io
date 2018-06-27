import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions";
import { connect } from "react-redux";

class Signin extends Component {
  handleFormSubmit({ username, password, email, name, gender }) {
    this.props
      .createUser({ username, password, email, name, gender, role_id: 0 })
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

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="col-12">
        <h3 className="mb-4 mt-4">註冊一個新帳號</h3>
        <form
          onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          className="needs-validation"
        >
          <Field
            name="username"
            type="text"
            component={this.renderInput}
            label="學號（工號）"
            placeholder="學號（工號）範例：0512209"
          />
          <Field
            name="password"
            type="password"
            component={this.renderInput}
            label="密碼"
            placeholder="為你的帳號設定一組密碼"
          />
          <Field
            name="confirm_password"
            type="password"
            component={this.renderInput}
            label="密碼確認"
            placeholder="再輸入一次密碼"
          />

          <Field
            name="email"
            type="email"
            component={this.renderInput}
            label="電子信箱"
            placeholder="Email，範例：nctudatabase@gmail.com"
          />

          <Field
            name="name"
            type="text"
            component={this.renderInput}
            label="姓名"
            placeholder="你的名字，範例：張懋中"
          />

          <fieldset className="form-group">
            <div className="row">
              <label className="col-form-label col-sm-2 pt-0">性別</label>
              <div className="col-sm-10">
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    name="gender"
                    id="male"
                    component="input"
                    type="radio"
                    value="0"
                  />
                  <label className="form-check-label" htmlFor="male">
                    男性
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    name="gender"
                    id="female"
                    component="input"
                    type="radio"
                    value="1"
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="female">
                    女性
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          <button action="submit" className="btn btn-primary">
            確認送出
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "此欄位為必填";
  } else if (values.username.length > 10) {
    errors.username = "請只填入「學號(工號)」";
  }
  if (!values.password) {
    errors.password = "此欄位為必填";
  }
  if (!values.confirm_password) {
    errors.confirm_password = "此欄位為必填";
  }
  if (values.confirm_password != values.password) {
    errors.confirm_password = "與上一欄的密碼不符";
  }
  if (!values.email) {
    errors.email = "此欄位為必填";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "不合法的 Email";
  }
  if (!values.gender) {
    errors.gender = "此欄位為必填";
  } else if (values.gender != 0 && values.gender != 1) {
    errors.gender = "不合法的性別";
  }
  if (!values.name) {
    errors.name = "此欄位為必填";
  }
  return errors;
};

Signin = reduxForm({
  form: "signup",
  validate
})(Signin);

export default connect(
  null,
  actions
)(Signin);
