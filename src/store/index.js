'use strict';

import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import colors from '../reducers/Colors';
import messages from '../reducers/Messages';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

const messagesApp = combineReducers({
  messages,
  colors
});

const store = createStore(messagesApp, undefined, applyMiddleware(thunk, logger));
export default store;
