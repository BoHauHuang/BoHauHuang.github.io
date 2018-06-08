import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/announcement';
import { connect } from 'react-redux';

class AnnouncementEdit extends Component {

	handleFormSubmit({title, description}) {
		console.log(title, description);
		const id = this.props.match.params.id;
		this.props.updateAnnouncement({id, title, description});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Title: </label>
					<Field name="title" component={input} type="text" className="form-control" />
					<Field name="description" component={textarea} className="form-control" />
				</fieldset>
				<button action="submit" className="btn btn-primary">Submit</button>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return { initialValues: state.announcement.announcement };
}

export default connect(mapStateToProps, actions)(reduxForm({ form: "AnnouncementEdit" })(AnnouncementEdit));