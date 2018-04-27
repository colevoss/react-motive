import React, { createContext } from 'react';

const reduce = (action) => ({ state, dispatch, ...rest }) => {
  if (!action) return state;

  const newState = action(state, dispatch, rest);

  if (newState === null || newState === undefined) {
    return state;
  }

  return {
    ...state,
    ...newState,
  };
};

const createMotive = (defaultState = {}) => {
  const { Provider, Consumer } = createContext({ state: defaultState });

  class MotiveProvider extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        state: defaultState,
        dispatch: this.dispatch,
        ...(props.inject || {}),
      };
    }

    dispatch = (action) => {
      this.setState((state) => ({
        state: reduce(action)(state),
      }));
    };

    render() {
      return <Provider value={this.state}>{this.props.children}</Provider>;
    }
  }

  return { Provider: MotiveProvider, Consumer };
};

export default createMotive;
