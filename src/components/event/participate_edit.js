import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import * as editActions from "../../actions/EventAction";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import history from "../../history";

class EditParticipate extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchEvents();
    this.props.fetchEvent(this.props.match.params.id);
  }
  renderInput({
    input,
    label,
    type,
    size,
    display,
    placeholder,
    onClick,
    meta: { touched, error, warning }
  }) {
    return (
      <div className="form-group">
        {label ? <label>{label}</label> : ""}
        <div>
          <input
            {...input}
            className={
              "form-control " +
              (touched
                ? !error
                  ? warning
                    ? "is-valid "
                    : ""
                  : "is-invalid "
                : "") +
              size
            }
            placeholder={placeholder}
            type={type}
          />
          <div className="valid-feedback">{touched && !error}</div>
          <div className="invalid-feedback">
            {touched && error && <span>{error}</span>}
          </div>
          <div className="feedback text-success">
            {touched && warning && <span>{warning}</span>}
          </div>
        </div>
      </div>
    );
  }

  handleEventRegister({ name, members }) {
    members = members.map(member => {
      const match_id = this.props.auth.users.ids.find(
        id => this.props.auth.users.objs[id].username == member.username
      );
      return match_id;
    });
    const event_id = this.props.event.id;

    console.log({ name, members, event_id });

    this.props.registerTeamToEvent({ name, members, event_id });
  }

  renderMembers({ fields, meta: { error, submitFailed, warning } }) {
    const { member_min, member_max, team_max } = this.props.event;
    return (
      <div>
        {fields.map((member, index) => {
          return (
            <div key={index}>
              <div className="row">
                <div className="col-sm-10">
                  <Field
                    name={`${member}.username`}
                    type="text"
                    component={this.renderInput}
                    label={`隊員 ${index + 1} 學號`}
                  />
                </div>
                <div className="col sm-2">
                  <label>動作</label>
                  <button
                    type="button"
                    className="btn btn-warning btn-block"
                    title="移除"
                    onClick={() => fields.remove(index)}
                  >
                    移除
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => fields.push({})}
          className="btn btn-secondary"
        >
          新增隊員
        </button>

        {submitFailed &&
          error && (
            <div className="alert alert-danger mt-2" role="alert">
              {error}
            </div>
          )}
      </div>
    );
  }

  render() {
    if (this.props.event) {
      const {
        id,
        name,
        description,
        rule,
        member_min,
        member_max,
        team_max,
        regist_start,
        regist_end
      } = this.props.event;
      const { handleSubmit, fields } = this.props;
      if ( !this.props.auth.authenticated ) {
        history.push('/signin')
      }
      return (
        <div>
          <div className="mb-4">
            <h3 className="mb-4 mt-4">{name} － 填寫報名表</h3>
            <form onSubmit={handleSubmit(this.handleEventRegister.bind(this))}>
              <Field
                name="name"
                type="text"
                component={this.renderInput}
                size="col-form-label-lg"
                label="隊伍名稱"
                placeholder="隊伍名稱"
              />
              <FieldArray
                name="members"
                component={this.renderMembers.bind(this)}
              />
              <div className="text-center">
                <button action="submit" className="btn btn-primary mt-4 btn-lg">
                  送出報名
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

function validate(values, props) {
  const errors = {};

  if (!values.name) {
    errors.name = "請輸入隊名";
  }

  if (props.isEventLoaded) {
    const { member_min, member_max } = props.event;

    if (!values.members || !values.members.length) {
      errors.members = {
        _error: `本活動最少需有 ${member_min} 名隊員，最多 ${member_max} 名。`
      };
    } else {
      if (values.members.length > member_max) {
        errors.members = { _error: `本活動最多只能有 ${member_max} 名隊員` };
      }
      if (values.members.length < member_min) {
        errors.members = { _error: `本活動最少需有 ${member_min} 名隊員` };
      }

      const memberArrayErrors = [];
      values.members.forEach((member, memberIndex) => {
        const memberErrors = {};
        if (!member.username) {
          memberErrors.username = "請輸入隊員的學號";
          memberArrayErrors[memberIndex] = memberErrors;
        } else if (!props.auth.isLoading) {
          const match_id = props.auth.users.ids.find(
            id => props.auth.users.objs[id].username == member.username
          );
          if (!match_id) {
            memberErrors.username = "找不到與該學號匹配的同學";
            memberArrayErrors[memberIndex] = memberErrors;
          }
        }
      });

      if (memberArrayErrors.length) {
        errors.members = memberArrayErrors;
      }
    }
  }

  return errors;
}

function warn(values, props) {
  const warnings = {};
  console.log("run warnings");
  if (props.auth && !props.auth.isLoading) {
    const memberArraywarnings = [];
    const ids = props.auth.users.ids;
    const objs = props.auth.users.objs;
    if (values && values.members) {
      values.members.forEach((member, memberIndex) => {
        const memberwarnings = {};

        if (member.username) {
          const match_id = ids.find(id => objs[id].username == member.username);
          if (match_id) {
            memberwarnings.username = objs[match_id].name;
            memberArraywarnings[memberIndex] = memberwarnings;
          }
        }
      });

      if (memberArraywarnings.length) {
        warnings.members = memberArraywarnings;
      }
    }
  }

  return warnings;
}

function mapStateToProps(state) {
  return {
    event: state.event.event.objs[state.event.currentEventId],
    isEventLoaded: state.event.isEventLoaded,
    auth: state.auth,
    initialValues: {
      members: [{}]
    }
  };
}

export default connect(
  mapStateToProps,
  editActions
)(reduxForm({ form: "EditParticipate", validate, warn })(EditParticipate));
