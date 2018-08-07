'use strict';

import Messages from '../resources/Messages';
import {
  LISTING_MESSAGES,
  SEARCHING_MESSAGES,
  MESSAGES_LOADED,
  MESSAGES_LOAD_ERROR,
  CREATING_MESSAGE,
  MESSAGE_CREATION_ERROR
} from '../constants/ActionTypes';

function listingMessages() {
  return {
    type: LISTING_MESSAGES
  };
}

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

function listMessages() {
  return dispatch => {
    dispatch(listingMessages());

    return Messages.get()
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

function searchMessages(content, color) {
  return dispatch => {
    dispatch(searchingMessages());

    return Messages.get(content, color)
      .then(response => response.json())
      .then(body => dispatch(loadedMessages(body)))
      .catch(err => dispatch(loadError(err)));
  };
}

export {listMessages, createMessage, searchMessages};