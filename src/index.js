import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import EditEvent from './components/event/editevent.js';
import ViewEvent from './components/event/viewevent.js';
import SignupEvent from './components/event/signup_event.js';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="/signin" component={Signin} />
				<Route path="/signup" component={Signup} />
				<Route path="/signout" component={Signout} />
				<Route path="/eventlist" component={ViewEvent} />
				<Route path="/editevent" component={Edit} />
				<Route path="/edit" component={Edit} />
				<Route path="/signup_event" component={SignupEvent} />
			</Route>
		</Router>
	</Provider>
  , document.querySelector('.container'));
