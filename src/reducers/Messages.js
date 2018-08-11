'use strict';

import {
  SEARCHING_MESSAGES,
  MESSAGES_LOADED,
  MESSAGES_LOAD_ERROR,
  CREATING_MESSAGE,
  MESSAGE_CREATION_ERROR,
  MESSAGE_CREATED,
  MESSAGES_REQUEST_ABORT
} from '../constants/ActionTypes';
import Immutable, { fromJS } from 'immutable';

const initialState = fromJS({
  'searching': false,
  'adding': false,
  'messages': []
});

export default function messages(state = initialState, action) {
  const isError = action.error;

  switch (action.type) {
    case SEARCHING_MESSAGES:
      return state.set('searching', true).set('abort', action.payload);
    case MESSAGES_LOADED:
      const messages = action.payload;

      return initialState.set('messages', Immutable.List(messages));
    case MESSAGES_LOAD_ERROR:
      if (isError && action.payload.name != 'AbortError') {
        return state
          .merge({
            'error': action.payload,
            'searching': false
          });
      } else {
        return state;
      }
    case CREATING_MESSAGE:
      return state.set('adding', true);

    case MESSAGE_CREATION_ERROR:
      if (isError) {
        return state
          .merge({
            'error': action.payload,
            'adding': false
          });
      } else {
        return state;
      }
    case MESSAGE_CREATED:
      return state.set('adding', false);
    case MESSAGES_REQUEST_ABORT:
      return state;
    default:
      return state
  }
}
