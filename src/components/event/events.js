import React, { Component } from 'react';
import * as editActions from '../../actions/EventAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Events extends Component {

	componentWillMount() {
    	this.props.fetchEvents();
	}

  renderEvents() {
		if (this.props.events){
		return this.props.events.map((event) => {
      return (
       <li className="list-group-item" key={event.id}>
         <div>
				 	<Link to={"event/" + event.id}>
				 		<strong>{event.name}</strong>
						<button className="btn btn-info btn-sm ">See more...</button>
					</Link>
				</div>
       </li>
      )
    });
	}
	else {
		return (
			<div>Loading...</div>
		)
	}
}

  render() {
    return (
      <div>
				<div className="row mb-4 mt-4">
					<div className="col">
        		<h3>活動</h3>
					</div>
					<div className="col text-right">
            <Link to={"/event/add"} className="btn btn-primary">
              新增活動
            </Link>
          </div>
				</div>
				<div>
					<ul className="list-group">
						{this.renderEvents()}
        	</ul>
				</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
		events: state.event.all
	};
}


export default connect(mapStateToProps, editActions)(Events);
