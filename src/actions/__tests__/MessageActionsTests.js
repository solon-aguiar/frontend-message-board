'use strict';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {
  SEARCHING_MESSAGES,
  MESSAGES_LOADED,
  MESSAGES_LOAD_ERROR,
  CREATING_MESSAGE,
  MESSAGE_CREATION_ERROR,
  MESSAGE_CREATED,
  MESSAGES_REQUEST_ABORT
} from '../../constants/ActionTypes';
import * as actions from '../../actions/MessageActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const signal = function() {return "signal"}
const abort = function() {return "abort"}

const myAbortController = class MockAbortController {
  constructor() {
    this.signal = "signal"
    this.abort = "abort"
  }
}
global.AbortController = myAbortController;
const mockAbortObj = new AbortController();

describe('MessageActions', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  describe('createMessages', () => {
    it('dispatches a CREATING_MESSAGE and MESSAGE_CREATED on success', () => {
      fetch.mockResponse("{}");

      const expectedActions = [
        { type: CREATING_MESSAGE },
         { type: MESSAGE_CREATED}
      ];
      const store = mockStore({})

      return store.dispatch(actions.createMessage("", "")).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });

    it('dispatches CREATING_MESSAGE and MESSAGE_CREATION_ERROR in case of failure', () => {
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
    it('dispatches SEARCHING_MESSAGES and MESSAGES_LOADED in successfull message load', () => {
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
        { type: SEARCHING_MESSAGES, payload: mockAbortObj },
        { type: MESSAGES_LOADED, payload: messages }
      ];
      const store = mockStore({});
      
      return store.dispatch(actions.searchMessages("content", "blue")).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(fetch.mock.calls.length).toBe(1);
        expect(fetch.mock.calls[0]).toEqual(['/api/messages?_sort=id&_order=desc&q=content&color=blue', { signal: 'signal' } ]);
      });
    });


    it('dispatches SEARCHING_MESSAGES and MESSAGES_LOAD_ERROR in case of non-abort failure', () => {
      const error = new Error("failed request");
      fetch.mockReject(error);

      const expectedActions = [
        { type: SEARCHING_MESSAGES, payload: mockAbortObj },
        { type: MESSAGES_LOAD_ERROR, payload: error, error: true }
      ];
      const store = mockStore({})

      return store.dispatch(actions.searchMessages("content", "blue")).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });

    it('dispatches SEARCHING_MESSAGES and MESSAGES_REQUEST_ABORT in case of abort failure ', () => {
      const error = new Error("ugly error");
      error.name = 'AbortError';
      fetch.mockReject(error);

      const expectedActions = [
        { type: SEARCHING_MESSAGES, payload: mockAbortObj },
        { type: MESSAGES_REQUEST_ABORT }
      ];
      const store = mockStore({})

      return store.dispatch(actions.searchMessages("content", "blue")).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
    });
  });
});