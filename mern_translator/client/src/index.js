import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

  // <Provider store={store}>
  // </Provider>,
ReactDOM.render(
    <App />,
  document.getElementById('root'),
);
