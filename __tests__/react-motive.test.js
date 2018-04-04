import React from 'react';
import { render, Simulate } from 'react-testing-library';
import 'react-testing-library/extend-expect';
import { createMotive } from '../src/react-motive';

const testAction = () => ({
  updated: 'yes',
});

const TestMotive = createMotive({ updated: 'no' });

const TestMotiveUser = () => (
  <TestMotive.Provider>
    <TestMotive.Consumer>
      {({ state }) => <div data-testid="test-motive">{state.updated}</div>}
    </TestMotive.Consumer>

    <TestMotive.Consumer>
      {({ dispatch }) => (
        <button onClick={() => dispatch(testAction)}>Fire Action</button>
      )}
    </TestMotive.Consumer>
  </TestMotive.Provider>
);

test('Dispatching actions updates Consumers', () => {
  const { getByTestId, getByText } = render(<TestMotiveUser />);

  expect(getByTestId('test-motive')).toHaveTextContent('no');

  Simulate.click(getByText('Fire Action'));

  expect(getByTestId('test-motive')).toHaveTextContent('yes');
});
