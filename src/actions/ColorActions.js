'use strict';

import Colors from '../resources/Colors';
import { LISTING_COLORS, COLORS_LOADED, COLORS_LOAD_ERROR } from '../constants/ActionTypes';

function listingColors() {
  return {
    type: LISTING_COLORS
  };
}

function loadedColors(colors) {
  return {
    type: COLORS_LOADED,
    payload: colors
  };
}

function loadError(err) {
  return {
    type: COLORS_LOAD_ERROR,
    payload: err,
    error: true
  };
}

function listColors() {
  return dispatch => {
    dispatch(listingColors());

    return Colors.get()
      .then(response => response.json())
      .then(body => dispatch(loadedColors(body)))
      .catch(err => dispatch(loadError(err)));
  };
}

export {listColors};