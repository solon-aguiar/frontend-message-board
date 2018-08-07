'use strict';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {
  LISTING_MESSAGES,
  SEARCHING_MESSAGES,
  MESSAGES_LOADED,
  MESSAGES_LOAD_ERROR,
  CREATING_MESSAGE,
  MESSAGE_CREATION_ERROR
} from '../../constants/ActionTypes';
import * as actions from '../../actions/MessageActions'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MessageActions', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  describe('listMessages', () => {
    it('dispatches all the messages in successfull message load', () => {
      const messages = [
          {
            "id": 1,
            "content": "It takes sunshine and rain to make a rainbow.",
            "color": "linear-gradient(to right, #e6e600, #f7941d 17%, #fff100 34%, #00a650 51%, #0054a5 68%, #672d93 85%, #672d93)"
          },
          {
            "id": 2,
            "content": "Without darkness there can be no light.",
            "color": ""
          },
          {
            "id": 3,
            "content": "Positive thinking will let you do everything better than negative thinking will.",
            "color": "#672d93"
          },
          {
            "id": 4,
            "content": "It always seems impossible until it is done.",
            "color": "#2795D9"
          },
        ];
      fetch.mockResponse(JSON.stringify(messages));

      const expectedActions = [
        { type: LISTING_MESSAGES },
        { type: MESSAGES_LOADED, payload: messages }
      ];
      const store = mockStore({})

      return store.dispatch(actions.listMessages()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });


    it('dispatches an error in case of failure', () => {
      const error = new Error("failed request");
      fetch.mockReject(error);

      const expectedActions = [
        { type: LISTING_MESSAGES },
        { type: MESSAGES_LOAD_ERROR, payload: error, error: true }
      ];
      const store = mockStore({})

      return store.dispatch(actions.listMessages()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });
  });

  describe('createMessages', () => {
    it('dispatches a CREATING_MESSAGE event', () => {
      fetch.mockResponse("{}");

      const expectedActions = [
        { type: CREATING_MESSAGE }
      ];
      const store = mockStore({})

      return store.dispatch(actions.createMessage("", "")).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });

    it('dispatches an error in case of failure', () => {
      const error = new Error("failed request");
      fetch.mockReject(error);

      const expectedActions = [
        { type: CREATING_MESSAGE },
        { type: MESSAGE_CREATION_ERROR, payload: error, error: true }
      ];
      const store = mockStore({})

      return store.dispatch(actions.createMessage("", "")).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });
  });

  describe('searchMessages', () => {
    it('dispatches all the messages in successfull message load', () => {
      const messages = [
          {
            "id": 1,
            "content": "It takes sunshine and rain to make a rainbow.",
            "color": "linear-gradient(to right, #e6e600, #f7941d 17%, #fff100 34%, #00a650 51%, #0054a5 68%, #672d93 85%, #672d93)"
          },
          {
            "id": 2,
            "content": "Without darkness there can be no light.",
            "color": ""
          },
          {
            "id": 3,
            "content": "Positive thinking will let you do everything better than negative thinking will.",
            "color": "#672d93"
          },
          {
            "id": 4,
            "content": "It always seems impossible until it is done.",
            "color": "#2795D9"
          },
        ];
      fetch.mockResponse(JSON.stringify(messages));

      const expectedActions = [
        { type: SEARCHING_MESSAGES },
        { type: MESSAGES_LOADED, payload: messages }
      ];
      const store = mockStore({})

      return store.dispatch(actions.searchMessages("content", "blue")).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });


    it('dispatches an error in case of failure', () => {
      const error = new Error("failed request");
      fetch.mockReject(error);

      const expectedActions = [
        { type: SEARCHING_MESSAGES },
        { type: MESSAGES_LOAD_ERROR, payload: error, error: true }
      ];
      const store = mockStore({})

      return store.dispatch(actions.searchMessages("content", "blue")).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });
  });
});