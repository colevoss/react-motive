# React Motive

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

## Huh?

`createMotive` returns a `Provider` and `Consumer`. The `Provider` is the boring part and needs to wrap any instance of the corresponding `Consumer`. The `Consumer` component takes a render prop as a child

## Documentation

### `createMotive(defaultState: Object): { Provider: React.Component, Consumer: React.Component }`

`createMotive` returns an object with a `Provider` component and a `Consumer` component.

```js
const defaultState = { count: 1 };

const { Provider, Consumer } = createMotive(defaultState);
```

### `<Provider>`

The `Provider` is a React component that should wrap all of its corresponding `Consumer` components. This component holds all of the state given from `defaultState` and that is updated later on.

### `<Consumer>`
