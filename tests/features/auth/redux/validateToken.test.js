import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_VALIDATE_TOKEN_BEGIN,
  AUTH_VALIDATE_TOKEN_SUCCESS,
  AUTH_VALIDATE_TOKEN_FAILURE,
  AUTH_VALIDATE_TOKEN_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  validateToken,
  dismissValidateTokenError,
  reducer,
} from '../../../../src/features/auth/redux/validateToken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/validateToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when validateToken succeeds', () => {
    const store = mockStore({});

    return store.dispatch(validateToken())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_VALIDATE_TOKEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_VALIDATE_TOKEN_SUCCESS);
      });
  });

  it('dispatches failure action when validateToken fails', () => {
    const store = mockStore({});

    return store.dispatch(validateToken({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_VALIDATE_TOKEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_VALIDATE_TOKEN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissValidateTokenError', () => {
    const expectedAction = {
      type: AUTH_VALIDATE_TOKEN_DISMISS_ERROR,
    };
    expect(dismissValidateTokenError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_VALIDATE_TOKEN_BEGIN correctly', () => {
    const prevState = { validateTokenPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_VALIDATE_TOKEN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateTokenPending).toBe(true);
  });

  it('handles action type AUTH_VALIDATE_TOKEN_SUCCESS correctly', () => {
    const prevState = { validateTokenPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_VALIDATE_TOKEN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateTokenPending).toBe(false);
  });

  it('handles action type AUTH_VALIDATE_TOKEN_FAILURE correctly', () => {
    const prevState = { validateTokenPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_VALIDATE_TOKEN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateTokenPending).toBe(false);
    expect(state.validateTokenError).toEqual(expect.anything());
  });

  it('handles action type AUTH_VALIDATE_TOKEN_DISMISS_ERROR correctly', () => {
    const prevState = { validateTokenError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_VALIDATE_TOKEN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateTokenError).toBe(null);
  });
});

