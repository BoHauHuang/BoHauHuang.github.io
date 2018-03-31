import {jQuery as $} from 'jquery';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import GameA from './components/game_a';
import GameB from './components/game_b';

class App extends Component {

  render(){

    return(
      <GameB/>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('.container'));
