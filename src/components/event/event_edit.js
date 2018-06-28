import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as editActions from "../../actions/EventAction";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class Events extends Component {
  componentWillMount() {
    //console.log("ID:",this.props.match.params.id);
    this.props.fetchEvent(this.props.match.params.id);
  }
  update_event_Submit({
    name,
    description,
    rule,
    teamMax,
    memMin,
    reg_start,
    reg_end
  }) {
    //console.log({name, description, rule, teamMax, memMin, reg_start, reg_end});
    const eventname = this.props.targetevent.name;
    if (!name) name = eventname;
    const event_id = this.props.match.params.id;
    this.props.updateEvent({
      event_id,
      name,
      description,
      rule,
      teamMax,
      memMin,
      reg_start,
      reg_end
    });
    this.props.history.push("/event");
  }
  renderEventName() {
    if (this.props.targetevent) {
      const name = this.props.targetevent.name;
      return name;
    }
  }
  renderInput({ input, label, type, size, placeholder }) {
    return (
      <div className="form-group">
        {label ? <label>{label}</label> : ""}
        <div>
          <input
            {...input}
            className={"form-control " + size}
            placeholder={placeholder}
            type={type}
          />
        </div>
      </div>
    );
  }

  renderTextarea({ input, label, type, size, rows, placeholder }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <div>
          <textarea
            {...input}
            className={"form-control " + size}
            placeholder={placeholder}
            type={type}
            rows={rows}
          />
        </div>
      </div>
    );
  }

  renderEvent() {
    if (this.props.targetevent) {
      const { handleSubmit } = this.props;

      const event_name = this.props.targetevent.name;
      const description = this.props.targetevent.description;
      const rule = this.props.targetevent.rule;
      const mem_Min = this.props.targetevent.member_min;
      const team_Max = this.props.targetevent.team_max;
      const reg_start = this.props.targetevent.reg_start;
      const reg_end = this.props.targetevent.reg_end;

      return (
        <div>
          <div className="alert alert-warning" role="alert">
            請填寫需要更改的內容
          </div>
          <form onSubmit={handleSubmit(this.update_event_Submit.bind(this))}>
            <fieldset className="form-group">
              <Field
                name="name"
                className="form-control"
                component={this.renderInput}
                type="text"
                placeholder={event_name}
                label="活動名稱"
              />
              <Field
                name="description"
                type="description"
                component={this.renderTextarea}
                size="col-form-label"
                rows="4"
                label="活動簡介"
                placeholder={description}
              />
              <Field
                name="rule"
                type="text"
                component={this.renderTextarea}
                size="col-form-label"
                label="活動規則"
                rows="3"
                placeholder={rule}
              />
              <Field
                name="teamMax"
                component={this.renderInput}
                type="number"
                size="col-form-label"
                label="參加隊伍上限: "
                placeholder={team_Max}
              />
              <Field
                name="memMin"
                component={this.renderInput}
                type="number"
                size="col-form-label"
                label="團隊人數下限: "
                placeholder={mem_Min}
              />
              <Field
                name="reg_start"
                component={this.renderInput}
                type="datetime-local"
                label="報名開始時間: "
                placeholder={reg_start}
              />
              <Field
                name="reg_end"
                component={this.renderInput}
                type="datetime-local"
                label="報名截止時間: "
                placeholder={reg_end}
              />
            </fieldset>

            <button action="submit" className="btn btn-primary">
              Done
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
    } else {
      <a>Connecting...</a>;
    }
  }
  render() {
    return (
      <div>
        <h3 className="mb-4 mt-4">編輯活動 - {this.renderEventName()}</h3>
        {this.renderEvent()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    targetevent: state.event.event,
    teams: state.event.teams
  };
}
export default connect(
  mapStateToProps,
  editActions
)(reduxForm({ form: "EditEvent" })(Events));
