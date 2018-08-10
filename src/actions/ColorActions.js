'use strict';

import Colors from '../resources/Colors';
import { SEARCHING_COLORS, COLORS_LOADED, COLORS_LOAD_ERROR } from '../constants/ActionTypes';

function searchColorsAction() {
  return {
    type: SEARCHING_COLORS
  };
}

function loadedColorsAction(colors) {
  return {
    type: COLORS_LOADED,
    payload: colors
  };
}

function loadErrorAction(err) {
  return {
    type: COLORS_LOAD_ERROR,
    payload: err,
    error: true
  };
}

function searchColors() {
  return dispatch => {
    dispatch(searchColorsAction());

    return Colors.get()
      .then(response => response.json())
      .then(body => dispatch(loadedColorsAction(body)))
      .catch(err => dispatch(loadErrorAction(err)));
  };
}

export {searchColors};