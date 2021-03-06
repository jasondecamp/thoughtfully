import initialState from './initialState';
import { reducer as saveThoughtReducer } from './saveThought';
import { reducer as suggestThoughtReducer } from './suggestThought';

const reducers = [
  saveThoughtReducer,
  suggestThoughtReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
