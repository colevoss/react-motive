import { combineActions } from '../src/react-motive';

const defaultState = {
  a: 0,
  b: 0,
};

const actionA = (state, dispatch) => {
  dispatch();

  return {
    a: state.a + 1,
  };
};

const actionB = (state) => ({
  b: state.b + 1,
});

test('combineActions', () => {
  const combined = combineActions(actionA, actionB);
  const dispatch = jest.fn();

  const result = combined(defaultState, dispatch);

  expect(result.a).toBe(1);
  expect(result.b).toBe(1);
  expect(dispatch).toHaveBeenCalled();
});
