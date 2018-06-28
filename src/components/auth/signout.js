import React, {Component} from 'react';
import { connect} from 'react-redux';
import * as actions from '../../actions';
import { Link, withRouter } from 'react-router-dom';
class Signout extends Component {
	componentWillMount() {
		this.props.signoutUser();
	}

	render() {
		return(
			<div>
				<h3 className="col text-center mt-5">再會了。你還會再回來的對吧。</h3>
				<Link to={"/#"} action="main" className="btn btn-info btn-lg col text-center mt-4"> 回首頁 </Link>
			</div>

		);
	}
}

export default connect(null, actions)(Signout);
