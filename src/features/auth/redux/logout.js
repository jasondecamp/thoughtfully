import axios from 'axios';
import Auth from '../authService';
import {
  AUTH_LOGOUT_BEGIN,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function logout(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: AUTH_LOGOUT_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get('/logout',args);
      doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_LOGOUT_SUCCESS,
            data: res.data.data[0],
          });
          resolve(res.data.data[0]);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: AUTH_LOGOUT_FAILURE,
            data: { error: err.response.data },
          });
          reject(err.response.data);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLogoutError() {
  return {
    type: AUTH_LOGOUT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_LOGOUT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        logoutPending: true,
        logoutError: null,
      };

    case AUTH_LOGOUT_SUCCESS:
      // The request is success
      Auth.setSession(false);
      return {
        ...state,
        access_token: null,
        user: false,
        logoutPending: false,
        logoutError: null,
      };

    case AUTH_LOGOUT_FAILURE:
      // The request is failed
      return {
        ...state,
        logoutPending: false,
        logoutError: action.data.error,
      };

    case AUTH_LOGOUT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        logoutError: null,
      };

    default:
      return state;
  }
}
