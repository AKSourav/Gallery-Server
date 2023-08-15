import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';

// creating redux to pass all the data to app components
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  </>
);
