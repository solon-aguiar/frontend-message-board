'use strict';

import { SEARCHING_COLORS, COLORS_LOADED, COLORS_LOAD_ERROR } from '../constants/ActionTypes';
import Immutable, { fromJS } from 'immutable';

const initialState = fromJS({
  'searching': false,
  'colors': []
});

export default function colors(state = initialState, action) {
  const isError = action.error;

  switch (action.type) {
    case SEARCHING_COLORS:
      return state.set('searching', true);
    case COLORS_LOADED:
      const colors = action.payload;

      return initialState.set('colors', Immutable.List(colors));
    case COLORS_LOAD_ERROR:
      if (isError) {
        return state
          .merge({
            'error': action.payload,
            'searching': false
          });
      } else {
        return state;
      }
    default:
      return state
  }
}
