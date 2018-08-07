import './styles.css';

import React from 'react';
import App from './containers/App';
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import store from './store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('new-app')
)
