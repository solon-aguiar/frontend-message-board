'use strict';

import Messages from '../resources/Messages';
import {
  SEARCHING_MESSAGES,
  MESSAGES_LOADED,
  MESSAGES_LOAD_ERROR,
  CREATING_MESSAGE,
  MESSAGE_CREATION_ERROR,
  MESSAGE_CREATED,
  MESSAGES_REQUEST_ABORT
} from '../constants/ActionTypes';

function searchingMessagesAction(abort) {
  return {
    type: SEARCHING_MESSAGES,
    payload: abort
  };
}

function creatingMessageAction() {
  return {
    type: CREATING_MESSAGE
  };
}

function loadedMessagesAction(messages) {
  return {
    type: MESSAGES_LOADED,
    payload: messages
  };
}

function loadErrorAction(err) {
  return {
    type: MESSAGES_LOAD_ERROR,
    payload: err,
    error: true
  };
}

function requestAbortedAction() {
  return {
    type: MESSAGES_REQUEST_ABORT
  };
}

function creationErrorAction(err) {
  return {
    type: MESSAGE_CREATION_ERROR,
    payload: err,
    error: true
  };
}

function messageCreatedAction() {
  return {
    type: MESSAGE_CREATED
  };
}

function createMessage(content, color) {
  return dispatch => {
    dispatch(creatingMessageAction());

    return Messages.create(content, color)
      .then(response => dispatch(messageCreatedAction()))
      .catch(err => dispatch(creationErrorAction(err)));
  }
}

function searchMessages(content, color) {
  return dispatch => {
    const abortController = new AbortController();
    dispatch(searchingMessagesAction(abortController));

    return Messages.get(content, color, abortController.signal)
      .then(response => response.json())
      .then(body => dispatch(loadedMessagesAction(body)))
      .catch(err => {
        if (err.name === 'AbortError') {
          dispatch(requestAbortedAction());
        } else {
          dispatch(loadErrorAction(err));
        }
      });
  };
}

export {createMessage, searchMessages};