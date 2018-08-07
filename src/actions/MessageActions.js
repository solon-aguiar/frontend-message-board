'use strict';

import Messages from '../resources/Messages';
import {
  FETCHING_MESSAGES,
  MESSAGES_LOADED,
  MESSAGES_LOAD_ERROR,
  CREATING_MESSAGE,
  MESSAGE_CREATION_ERROR
} from '../constants/ActionTypes';

function loadingMessages() {
  return {
    type: FETCHING_MESSAGES
  };
}

function creatingMessage() {
  return {
    type: CREATING_MESSAGE
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

function creationError(err) {
  return {
    type: MESSAGE_CREATION_ERROR,
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

function createMessage(content, color) {
  return dispatch => {
    dispatch(creatingMessage());

    return Messages.create(content, color)
      .then(response => response.json())
      .catch(err => dispatch(creationError(err)));
  }
}

export {getMessages, createMessage};