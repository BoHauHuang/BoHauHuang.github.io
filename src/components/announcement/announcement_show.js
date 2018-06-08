import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/announcement';
import { connect } from 'react-redux';

class AnncouncementShow extends Component {

    componentWillMount() {
        this.props.fetchAnnouncement(this.props.match.params.id);
    }

	render() {
		const { post } = this.props;
		if ( post ) {
			return (
		        <div>
		            <h3>{post.title}</h3>
		            {post.description}		            
		        </div>
	        );
		} else {
			return (
				<div>
					Loading...
				</div>
			)
		}
    }
}

const mapStateToProps = (state) => {
  return { post: state.announcement.announcement };
}


export default connect(mapStateToProps, actions)(AnncouncementShow);