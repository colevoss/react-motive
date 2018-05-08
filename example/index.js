import React from 'react';
import { render } from 'react-dom';
import createMotive, { combineActions } from '../src/react-motive';

const defaultState = { count: 0, somethingElse: 0 };

const decrement = ({ count }) => {
  return {
    count: count - 1,
  };
};

const somethingElse = (state) => {
  return {
    somethingElse: state.somethingElse + 1,
  };
};

const increment = (state, dispatch) => {
  return {
    count: state.count + 1,
  };
};

const doubleIncrement = combineActions(increment, somethingElse);

const TestCotext = createMotive(defaultState);

const Display = () => {
  return (
    <TestCotext.Consumer>
      {({ state }) => {
        return (
          <div>
            <h1>Count: {state.count}</h1>
            <h1>Something Else: {state.somethingElse}</h1>
          </div>
        );
      }}
    </TestCotext.Consumer>
  );
};

const Controlls = () => {
  return (
    <TestCotext.Consumer>
      {({ dispatch }) => {
        return (
          <div>
            <button onClick={() => dispatch(decrement)}>-</button>
            <button onClick={() => dispatch(doubleIncrement)}>+</button>
          </div>
        );
      }}
    </TestCotext.Consumer>
  );
};

const Test = () => {
  return (
    <TestCotext.Provider>
      <Display />

      <Controlls />
    </TestCotext.Provider>
  );
};

render(<Test />, document.getElementById('example'));
