import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_FORGOT_PASSWORD_BEGIN,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILURE,
  AUTH_FORGOT_PASSWORD_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  forgotPassword,
  dismissForgotPasswordError,
  reducer,
} from '../../../../src/features/auth/redux/forgotPassword';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/forgotPassword', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when forgotPassword succeeds', () => {
    const store = mockStore({});

    return store.dispatch(forgotPassword())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_FORGOT_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_FORGOT_PASSWORD_SUCCESS);
      });
  });

  it('dispatches failure action when forgotPassword fails', () => {
    const store = mockStore({});

    return store.dispatch(forgotPassword({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_FORGOT_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_FORGOT_PASSWORD_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissForgotPasswordError', () => {
    const expectedAction = {
      type: AUTH_FORGOT_PASSWORD_DISMISS_ERROR,
    };
    expect(dismissForgotPasswordError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_FORGOT_PASSWORD_BEGIN correctly', () => {
    const prevState = { forgotPasswordPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_FORGOT_PASSWORD_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.forgotPasswordPending).toBe(true);
  });

  it('handles action type AUTH_FORGOT_PASSWORD_SUCCESS correctly', () => {
    const prevState = { forgotPasswordPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_FORGOT_PASSWORD_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.forgotPasswordPending).toBe(false);
  });

  it('handles action type AUTH_FORGOT_PASSWORD_FAILURE correctly', () => {
    const prevState = { forgotPasswordPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_FORGOT_PASSWORD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.forgotPasswordPending).toBe(false);
    expect(state.forgotPasswordError).toEqual(expect.anything());
  });

  it('handles action type AUTH_FORGOT_PASSWORD_DISMISS_ERROR correctly', () => {
    const prevState = { forgotPasswordError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_FORGOT_PASSWORD_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.forgotPasswordError).toBe(null);
  });
});

