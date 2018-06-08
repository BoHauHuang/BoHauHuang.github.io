import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/announcement';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AnncouncementIndex extends Component {

    componentWillMount() {
        this.props.fetchAnnouncements();
    }

    renderPosts() {
        if (this.props.posts) {
            return this.props.posts.map((post) => {
                return (
                    <div className="list-group-item" key={post.id}>
                        
                        <Link to={"/announcement/" + post.id}>
                            <div>{post.title}</div>
                        </Link>
                        <p>
                            {post.description}
                        </p>
                    </div>
                )
            });
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }

    render() {
        return (
            <div>
                <h3>Announcements</h3>
                <p><Link to={"/announcement/create"} className="btn btn-primary">Create an announcement</Link></p>
                <div className="list-group">
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
  return { posts: state.announcement.all };
}


export default connect(mapStateToProps, actions)(AnncouncementIndex);