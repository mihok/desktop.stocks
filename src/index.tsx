import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import Application from './components/Application';
import { store } from './state';

// Global Stylesheets
import '../assets/css/meslo.scss';
import '../assets/css/base.scss';

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('app')
);
