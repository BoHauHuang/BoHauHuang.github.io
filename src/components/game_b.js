import {jQuery as $} from 'jquery';
import React, {Component} from 'react';

class GameB extends Component{

  getinfo = () => {
      axios.get('http://www.hy0936.com.tw:9980/api/Users/').then(function (response) {
        console.log(response.request.responseText);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render(){
    return(
      <div className = "list-group col-sm-4">
        <button onClick = {this.getinfo}> get data </button>
      </div>

  );
  }
}


export default GameB;
