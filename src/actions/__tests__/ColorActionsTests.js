'use strict';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { SEARCHING_COLORS, COLORS_LOADED, COLORS_LOAD_ERROR } from '../../constants/ActionTypes';
import * as actions from '../../actions/ColorActions'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ColorActions', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  describe('searchColors', () => {
    it('dispatches SEARCHING_COLORS and COLORS_LOADED in successfull color load', () => {
      const colors = [
        {
          "name": "Blue",
          "value": "#2795D9",
          "id": 1
        },
        {
          "name": "Purple",
          "value": "#672d93",
          "id": 2
        },
        {
          "name": "Rainbow",
          "value": "linear-gradient(to right, #e6e600, #f7941d 17%, #fff100 34%, #00a650 51%, #0054a5 68%, #672d93 85%, #672d93)",
          "id": 3
        }
      ];
      fetch.mockResponse(JSON.stringify(colors));

      const expectedActions = [
        { type: SEARCHING_COLORS },
        { type: COLORS_LOADED, payload: colors }
      ];
      const store = mockStore({})

      return store.dispatch(actions.searchColors()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });

    it('dispatches SEARCHING_COLORS and COLORS_LOAD_ERROR in case of failure', () => {
      const error = new Error("failed request");
      fetch.mockReject(error);

      const expectedActions = [
        { type: SEARCHING_COLORS },
        { type: COLORS_LOAD_ERROR, payload: error, error: true }
      ];
      const store = mockStore({})

      return store.dispatch(actions.searchColors()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });
  });
});