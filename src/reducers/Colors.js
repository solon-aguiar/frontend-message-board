'use strict';

import { LISTING_COLORS, COLORS_LOADED, COLORS_LOAD_ERROR } from '../constants/ActionTypes';
import Immutable, { fromJS } from 'immutable';

const initialState = fromJS({
  'listing': false,
  'colors': []
});

export default function messages(state = initialState, action) {
  const isError = action.error;

  switch (action.type) {
    case LISTING_COLORS:
      return state.set('listing', true);
    case COLORS_LOADED:
      const colors = action.payload;

      return initialState.set('colors', Immutable.List(colors));
    case COLORS_LOAD_ERROR:
      if (isError) {
        return state
          .merge({
            'error': action.payload,
            'listing': false
          });
      } else {
        return state;
      }
    default:
      return state
  }
}
