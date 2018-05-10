import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import anncsReducer from './anncs_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  anncs: anncsReducer
});

export default rootReducer;