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

// User
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';

// Events
import EventShow from './components/event/event_show.js';
import Events from './components/event/events.js';
import SignupEvent from './components/event/signup_event.js';
import AddEvent from './components/event/event_add.js';
import EditEvent from './components/event/event_edit.js';

// Announcements
import AnnouncementIndex from './components/announcement/announcement_index';
import AnnouncementShow from './components/announcement/announcement_show';
import AnnouncementUpdate from './components/announcement/announcement_edit';
import AnnouncementCreate from './components/announcement/announcement_create';


import { AUTH_USER, UNAUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if ( token ) {
      store.dispatch({ type: AUTH_USER });
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

                        <Route path="/announcement/create"  component={AnnouncementCreate} />
                        <Route path="/announcement/:id"  component={AnnouncementShow} />
                        <Route path="/announcement/:id/edit"  component={AnnouncementUpdate} />
                        <Route path="/announcement" component={AnnouncementIndex} />

                        <Route path="/event/add" component={AddEvent} />
                        <Route path="/event/:id/edit" component={EditEvent} />
                        <Route path="event/:id/join" component={SignupEvent} match={match} />
                        <Route path="/event/:id"  component={EventShow} />
                        <Route path="/event" component={Events} />



                    </Switch>
                </App>
            )}/>
        </Router>
    </Provider>
  , document.querySelector('.container'));
