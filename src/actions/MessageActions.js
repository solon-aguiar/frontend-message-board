'use strict';

import Messages from '../resources/Messages';
import { FETCHING_MESSAGES, MESSAGES_LOADED, MESSAGES_LOAD_ERROR } from '../constants/ActionTypes';

function loadingMessages() {
  return {
    type: FETCHING_MESSAGES
  };
}

function loadedMessages(messages) {
  return {
    type: MESSAGES_LOADED,
    payload: messages
  };
}

function loadError(err) {
  return {
    type: MESSAGES_LOAD_ERROR,
    payload: err,
    error: true
  };
}

function getMessages(searchText, color) {
  return dispatch => {
    dispatch(loadingMessages());

    return Messages.get(searchText, color)
      .then(response => response.json())
      .then(body => dispatch(loadedMessages(body)))
      .catch(err => dispatch(loadError(err)));
  };
}

export {getMessages};