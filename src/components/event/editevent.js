import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
class EditEvent extends Component {

  render(){
    $.ajax({
			type: 'GET',
			url: 'http://www.hy0936.com.tw:9980/api/Events',
			success: function(data){
				//console.log(data.length);
        var $events = $("#events");
        $events.empty();
        $.each(data, function(index, item){
          $events.append(
            "<tr><td><div class='alert alert-info' role ='alert'><strong>" + item.name + "</strong> -- max: " + item.maxnum +" / min: "+ item.minnum + "</div></td>"+
            "<td><button type='button' class='btn btn-warning'>Edit</button></td>" + "<td><button type='button' class='btn btn-danger'>Delete</button></td>" + "</tr>"
          );
        })
      }
		});
    return(
        <table id = "events">
        </table>
    )
  }
}

EditEvent = reduxForm({
  form: "editevent",
})(EditEvent);

export default connect(null, actions)(EditEvent);
