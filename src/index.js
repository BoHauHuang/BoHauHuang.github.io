import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import {
  HashRouter as Router,
  Route,
  IndexRoute,
  browserHistory,
  withRouter,
  Switch,
  match
} from 'react-router-dom';

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
 		<Router history={withRouter.history}>
			<Route path="/" component={(props)=> (
        <App {...props}>
          <Switch>
  				    <Route path="/signin" component={Signin} />
  				    <Route path="/signup" component={Signup} />
  				    <Route path="/signout" component={Signout} />
  				    <Route path="/events" component={Events} />
  				    <Route path="/event/:id"  component={EventShow} />
  				    <Route path="/signup_event" component={SignupEvent} match={match} />
        </Switch>
        </App>
      )}/>
		</Router>
	</Provider>
  , document.querySelector('.container'));
