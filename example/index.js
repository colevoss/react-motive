import React from 'react';
import { render } from 'react-dom';
import { createMotive } from '../src/react-motive';

const defaultState = { count: 0 };

const decrement = ({ count }) => {
  return {
    count: count - 1,
  };
};

const increment = ({ count }, dispatch) => {
  return {
    count: count + 1,
  };
};

const TestCotext = createMotive(defaultState);

const Display = () => {
  return (
    <TestCotext.Consumer>
      {({ state }) => <h1>Count: {state.count}</h1>}
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
            <button onClick={() => dispatch(increment)}>+</button>
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
