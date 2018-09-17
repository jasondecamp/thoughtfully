import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SUGGEST_THOUGHT_BEGIN,
  HOME_SUGGEST_THOUGHT_SUCCESS,
  HOME_SUGGEST_THOUGHT_FAILURE,
  HOME_SUGGEST_THOUGHT_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  suggestThought,
  dismissSuggestThoughtError,
  reducer,
} from '../../../../src/features/home/redux/suggestThought';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/suggestThought', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when suggestThought succeeds', () => {
    const store = mockStore({});

    return store.dispatch(suggestThought())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SUGGEST_THOUGHT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SUGGEST_THOUGHT_SUCCESS);
      });
  });

  it('dispatches failure action when suggestThought fails', () => {
    const store = mockStore({});

    return store.dispatch(suggestThought({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SUGGEST_THOUGHT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SUGGEST_THOUGHT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSuggestThoughtError', () => {
    const expectedAction = {
      type: HOME_SUGGEST_THOUGHT_DISMISS_ERROR,
    };
    expect(dismissSuggestThoughtError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SUGGEST_THOUGHT_BEGIN correctly', () => {
    const prevState = { suggestThoughtPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SUGGEST_THOUGHT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.suggestThoughtPending).toBe(true);
  });

  it('handles action type HOME_SUGGEST_THOUGHT_SUCCESS correctly', () => {
    const prevState = { suggestThoughtPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SUGGEST_THOUGHT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.suggestThoughtPending).toBe(false);
  });

  it('handles action type HOME_SUGGEST_THOUGHT_FAILURE correctly', () => {
    const prevState = { suggestThoughtPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SUGGEST_THOUGHT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.suggestThoughtPending).toBe(false);
    expect(state.suggestThoughtError).toEqual(expect.anything());
  });

  it('handles action type HOME_SUGGEST_THOUGHT_DISMISS_ERROR correctly', () => {
    const prevState = { suggestThoughtError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SUGGEST_THOUGHT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.suggestThoughtError).toBe(null);
  });
});

