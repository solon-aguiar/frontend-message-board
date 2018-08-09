'use strict';

import Messages from '../resources/Messages';
import {
  SEARCHING_MESSAGES,
  MESSAGES_LOADED,
  MESSAGES_LOAD_ERROR,
  CREATING_MESSAGE,
  MESSAGE_CREATION_ERROR,
  MESSAGE_CREATED
} from '../constants/ActionTypes';

function searchingMessages() {
  return {
    type: SEARCHING_MESSAGES
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

function messageCreated() {
  return {
    type: MESSAGE_CREATED
  };
}

function createMessage(content, color) {
  return dispatch => {
    dispatch(creatingMessage());

    return Messages.create(content, color)
      .then(response => dispatch(messageCreated()))
      .catch(err => dispatch(creationError(err)));
  }
}

function searchMessages(content, color) {
  return dispatch => {
    dispatch(searchingMessages());

    return Messages.get(content, color)
      .then(response => response.json())
      .then(body => dispatch(loadedMessages(body)))
      .catch(err => dispatch(loadError(err)));
  };
}

export {createMessage, searchMessages};