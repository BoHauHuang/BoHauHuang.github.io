import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
class ViewEvent extends Component {
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
            "<div class='row'>"+
            "<div class='col-md-9 cta-contents'>"+
            "<h1 class='cta-title'>"+ item.name + "</h1>"+
            "<div class='cta-desc'><p> capacity: "+ data.length + " / " + item.maxnum + "</p>"+
            "</div></div>"+
            "<div class='col-md-3 cta-button'><a href='#' class='btn btn-lg btn-block btn-default'>Go for It!</a>"+
            "</div></div>"
          );
        })
      }
    });
    return(
        <div className="col-sm-12" id = "events">
        </div>
    )
  }
}


ViewEvent = reduxForm({
  form: "viewevent",
})(ViewEvent);

export default connect(null, actions)(ViewEvent);
