import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory, match } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import EventShow from './components/event/show.js';
import Events from './components/event/events.js';
import SignupEvent from './components/event/signup_event.js';


import { AUTH_USER, UNAUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if ( token ) {
      store.dispatch({ type: AUTH_USER});
}


ReactDOM.render(
	<Provider store={store}>
 		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="/signin" component={Signin} />
				<Route path="/signup" component={Signup} />
				<Route path="/signout" component={Signout} />
				<Route path="/event" component={Events} />
				<Route path="/event/:id"  component={EventShow} />
				<Route path="/signup_event" component={SignupEvent} match={match} />
			</Route>
		</Router>
	</Provider>
  , document.querySelector('.container'));
