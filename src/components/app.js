import React, {Component} from 'react';
import GameB from './game_b';
import Header from './header';


export default class App extends Component {
  render(){
    return (
    	<div>
    		<Header/>
    		{this.props.children}
      	</div>
    );
  }
}