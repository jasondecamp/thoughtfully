import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import coreReducer from '../features/core/redux/reducer';
import examplesReducer from '../features/examples/redux/reducer';
import loginReducer from '../features/login/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage theme.

const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  core: coreReducer,
  examples: examplesReducer,
  login: loginReducer,
};

export default combineReducers(reducerMap);
