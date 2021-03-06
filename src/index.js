import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Datetime from 'react-datetime';
import moment from 'moment';
import _ from 'lodash';

import {
  HashRouter as Router,
  Route,
  IndexRoute,
  browserHistory,
  withRouter,
  Link,
  Switch,
  match
} from "react-router-dom";

import reduxThunk from "redux-thunk";

import App from "./components/app";
import reducers from "./reducers";

// User
import Signin from "./components/auth/signin";
import Signout from "./components/auth/signout";
import Signup from "./components/auth/signup";
import Profile from "./components/auth/profile.js";

// Events
import EventShow from "./components/event/event_show.js";
import Events from "./components/event/events.js";
import SignupEvent from "./components/event/signup_event.js";
import AddEvent from "./components/event/event_add.js";
import EditEvent from "./components/event/event_edit.js";
import EventParticipate from "./components/event/event_participate.js";
import EventStatus from "./components/event/event_status.js";
import EditParticipate from "./components/event/participate_edit.js";

// Announcements
import AnnouncementIndex from "./components/announcement/announcement_index";
import AnnouncementShow from "./components/announcement/announcement_show";
import AnnouncementUpdate from "./components/announcement/announcement_edit";
import AnnouncementCreate from "./components/announcement/announcement_create";
import AnnouncementLatest from "./components/announcement/announcement_latest";

import { AUTH_USER, UNAUTH_USER } from "./actions/types";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);
const store = createStoreWithMiddleware(
  reducers /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const token = localStorage.getItem("token");

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={withRouter.history}>
      <Route
        path="/"
        component={props => (
          <App {...props}>
            <Switch>
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="/signout" component={Signout} />
              <Route path="/profile" component={Profile} />
              <Route
                path="/announcement/create"
                component={AnnouncementCreate}
              />
              <Route
                path="/announcement/:id/edit"
                component={AnnouncementUpdate}
              />
              <Route path="/announcement/:id" component={AnnouncementShow} />

              <Route path="/announcement" component={AnnouncementIndex} />


              <Route path="/event/add" component={AddEvent} />
              <Route path="/event/participation/:id" component={EditParticipate} />
              <Route path="/event/participation" component={EventParticipate} />

              <Route path="/event/:id/edit" component={EditEvent} />
              <Route path="/event/:id/join" component={SignupEvent} />
              <Route path="/event/:id/status" component={EventStatus} />
              <Route path="/event/:id" component={EventShow} />

              <Route path="/event" component={Events} />
              <Route path="/" component={AnnouncementLatest} />
            </Switch>
          </App>
        )}
      />
    </Router>
  </Provider>,
  document.querySelector("#app")
);
