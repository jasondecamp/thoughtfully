import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SAVE_THOUGHT_BEGIN,
  HOME_SAVE_THOUGHT_SUCCESS,
  HOME_SAVE_THOUGHT_FAILURE,
  HOME_SAVE_THOUGHT_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  saveThought,
  dismissSaveThoughtError,
  reducer,
} from '../../../../src/features/home/redux/saveThought';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/saveThought', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveThought succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveThought())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SAVE_THOUGHT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SAVE_THOUGHT_SUCCESS);
      });
  });

  it('dispatches failure action when saveThought fails', () => {
    const store = mockStore({});

    return store.dispatch(saveThought({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SAVE_THOUGHT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SAVE_THOUGHT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveThoughtError', () => {
    const expectedAction = {
      type: HOME_SAVE_THOUGHT_DISMISS_ERROR,
    };
    expect(dismissSaveThoughtError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SAVE_THOUGHT_BEGIN correctly', () => {
    const prevState = { saveThoughtPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SAVE_THOUGHT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveThoughtPending).toBe(true);
  });

  it('handles action type HOME_SAVE_THOUGHT_SUCCESS correctly', () => {
    const prevState = { saveThoughtPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SAVE_THOUGHT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveThoughtPending).toBe(false);
  });

  it('handles action type HOME_SAVE_THOUGHT_FAILURE correctly', () => {
    const prevState = { saveThoughtPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SAVE_THOUGHT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveThoughtPending).toBe(false);
    expect(state.saveThoughtError).toEqual(expect.anything());
  });

  it('handles action type HOME_SAVE_THOUGHT_DISMISS_ERROR correctly', () => {
    const prevState = { saveThoughtError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SAVE_THOUGHT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveThoughtError).toBe(null);
  });
});

