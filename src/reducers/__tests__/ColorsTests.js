'use strict';

import reducer from '../../reducers/Colors';
import { SEARCHING_COLORS, COLORS_LOADED, COLORS_LOAD_ERROR } from '../../constants/ActionTypes';
import Immutable from 'immutable';

describe('Colors reducer', () => {
  const colors = [{"id": 1}, {"id": 2}];

  it('returns the initial state for undefined state', () => {
    expect(reducer(undefined, {})).toEqual(
      Immutable.Map({"searching": false, "colors": Immutable.List()})
    );
  });

  it('marks as searching for SEARCHING_COLORS action', () => {
    const action = {
      type: SEARCHING_COLORS
    };

    expect(reducer(undefined, action)).toEqual(
      Immutable.Map({"searching": true, "colors": Immutable.List()})
    );
  });

  it('marks as listing for SEARCHING_COLORS action for an existing state', () => {
    const action = {
      type: SEARCHING_COLORS
    };

    const existingState = Immutable.Map({"searching": false, "colors": Immutable.List(colors)})

    expect(reducer(existingState, action)).toEqual(
      Immutable.Map({"searching": true, "colors": Immutable.List(colors)})
    );
  });

  it('saves the colors in a COLORS_LOADED action', () => {
    const action = {
      type: COLORS_LOADED,
      payload: colors
    };

    expect(reducer(undefined, action)).toEqual(
      Immutable.Map({"searching": false, "colors": Immutable.List(colors)})
    );
  });

  it('sets an error and marks loading as false a COLORS_LOAD_ERROR action', () => {
    const error = new Error("ugly error");
    const existingState = Immutable.Map({"searching": true, "colors": Immutable.List(colors)})

    const action = {
      type: COLORS_LOAD_ERROR,
      payload: error,
      error: true
    };

    expect(reducer(existingState, action)).toEqual(
      Immutable.Map({"searching": false, "colors": Immutable.List(colors), "error": error})
    );
  });

  it('ignores the error for COLORS_LOAD_ERROR if there is no flag', () => {
    const existingState = Immutable.Map({"searching": true, "colors": Immutable.List(colors)})

    const action = {
      type: COLORS_LOAD_ERROR
    };

    expect(reducer(existingState, action)).toEqual(existingState);
  });
});