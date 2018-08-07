'use strict';

import {
  LISTING_MESSAGES,
  SEARCHING_MESSAGES,
  MESSAGES_LOADED,
  MESSAGES_LOAD_ERROR,
  CREATING_MESSAGE,
  MESSAGE_CREATION_ERROR,
  MESSAGE_CREATED
} from '../constants/ActionTypes';
import Immutable, { fromJS } from 'immutable';

const initialState = fromJS({
  'searching': false,
  'listing': false,
  'adding': false,
  'messages': []
});

export default function messages(state = initialState, action) {
  const isError = action.error;

  switch (action.type) {
    case LISTING_MESSAGES:
      return state.set('listing', true);
    case SEARCHING_MESSAGES:
      return state.set('searching', true);
    case MESSAGES_LOADED:
      const messages = action.payload;

      return initialState.set('messages', Immutable.List(messages));
    case MESSAGES_LOAD_ERROR:
      if (isError) {
        return state
          .merge({
            'error': action.payload,
            'listing': false,
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
    default:
      return state
  }
}
