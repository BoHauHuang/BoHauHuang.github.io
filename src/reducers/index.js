import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import anncsReducer from './anncs_reducer';
import eventReducer from './event_reducer';
 
const rootReducer = combineReducers({
   form,
   auth: authReducer,
   event: eventReducer
});

export default rootReducer;