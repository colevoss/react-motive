# React Motive

[![npm](https://img.shields.io/npm/v/react-motive.svg)](https://www.npmjs.com/package/react-motive)
[![npm](https://img.shields.io/npm/dm/react-motive.svg)](https://www.npmjs.com/package/react-motive)

## Install

```
yarn add react-motive
```

## Example

```js
import React from 'react';
import { createMotive } from 'react-motive';

/**
 * Default State
 */
const defaultState = { count: 0 };

/**
 * Actions:
 *
 * Actions dont have to be curried functions if they don't take arguments
 * as long as dispatch is given a function that returns a new slice of state.
 */
const increment = () => ({ count }) => ({
  count: count + 1,
});

const decrement = () => ({ count }) => ({
  count: count - 1,
});

/**
 * Create Container
 */
const Counter = createMotive(defaultState);

/**
 * Use Consumers
 */
const Display = () => (
  <Counter.Consumer>
    {({ state }) => <h1>Count: {state.count}</h1>}
  </Counter.Consumer>
);

const Controls = () => (
  <Counter.Consumer>
    {({ dispath }) => (
      <React.Fragment>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(increment())}>+</button>
      </React.Fragment>
    )}
  </Counter.Consumer>
);

/**
 * Put it all together
 */
const AllTogether = () => (
  <Counter.Provider>
    <Display />
    <Controls />
  </Counter.Provider>
);
```

## Documentation

#### `createMotive`

`createMotive` returns an object with a `Provider` component and a `Consumer` component.

```js
const defaultState = { count: 1 };

const { Provider, Consumer } = createMotive(defaultState);
```

#### `<Provider>`

The `Provider` is a React component that should wrap all of its corresponding `Consumer` components. This component holds all of the state given from `defaultState` and that is updated later on.

#### `<Consumer>`

The `Consumer` component is what you can use anywhere as long as its a child of the corresponding `Provider` component. Use this component to get access to the state of its `Provider` and to dispatch updates to that state.

```js
<Consumer>
  {({ state, dispatch }) => /* ... some react stuff that uses state or dispatch */ }
</Consumer>
```

This component takes a render prop as its child. This render prop is given an object with the following members in it.

##### `state`

This is the current state of the corresponding `Provider` component.

#### `dispatch`

`dispatch` should be called with an `action` function. An `action` should return a slice of new state to be merged into the `Provider`'s state.

### Actions

Actions are provided with the same argument as the `Consumer`'s render prop. You have access to the current state, and the `dispatch` function. This means you can dispatch other actions from an action if necessary.

An action must return a partial version of state.

**Pro Tip:**: If you need to give actions data, write them as curried functions and call them into `dispatch` with any arugments that they might need.

```js
/**
 * Basic action
 */
const increment = (state) => ({
  count: state.count + 1,
});

dispatch(increment);

/**
 * Curried action that takes arguments
 */
const incrementBy = (incrBy) => (state) => ({
  count: state.count + incrBy,
});

dipatch(incrementBy(2));

/**
 * Action that dispatches another action
 */
const delayedIncrement = (state, dispatch) => {
  setTimeout(() => dispatch(incrementBy(2)));

  return {
    count: state.count + 1,
  };
};

dipatch(delayedIcrement);
```
