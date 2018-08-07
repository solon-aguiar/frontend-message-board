'use strict';

import reducer from '../../reducers/Messages';
import {
  LISTING_MESSAGES,
  SEARCHING_MESSAGES,
  MESSAGES_LOADED,
  MESSAGES_LOAD_ERROR,
  CREATING_MESSAGE,
  MESSAGE_CREATION_ERROR,
  MESSAGE_CREATED
} from '../../constants/ActionTypes';
import Immutable from 'immutable';

describe('Messages reducer', () => {
  const messages = [{"id": 1}, {"id": 2}];

  it('returns the initial state for undefined state', () => {
    expect(reducer(undefined, {})).toEqual(
      Immutable.Map({"searching": false, "listing": false, "adding": false, "messages": Immutable.List()})
    );
  });

  it('marks as listing for LISTING_MESSAGES action', () => {
    const action = {
      type: LISTING_MESSAGES
    };

    expect(reducer(undefined, action)).toEqual(
      Immutable.Map({"searching": false, "listing": true, "adding": false, "messages": Immutable.List()})
    );
  });

  it('should mark as searching for SEARCHING_MESSAGES action', () => {
    const action = {
      type: SEARCHING_MESSAGES
    };

    expect(reducer(undefined, action)).toEqual(
      Immutable.Map({"searching": true, "listing": false, "adding": false, "messages": Immutable.List()})
    );
  });

  it('saves the messages in a MESSAGES_LOADED action', () => {
    const action = {
      type: MESSAGES_LOADED,
      payload: messages
    };

    expect(reducer(undefined, action)).toEqual(
      Immutable.Map({"searching": false, "listing": false, "adding": false, "messages": Immutable.List(messages)})
    );
  });

  it('sets an error and marks loading as false a MESSAGES_LOAD_ERROR action', () => {
    const error = new Error("ugly error");
    const existingState = Immutable.Map({"searching": true, "listing": false, "adding": false, "messages": Immutable.List(messages)})

    const action = {
      type: MESSAGES_LOAD_ERROR,
      payload: error,
      error: true
    };

    expect(reducer(existingState, action)).toEqual(
      Immutable.Map({"searching": false, "listing": false, "adding": false, "messages": Immutable.List(messages), "error": error})
    );
  });

  it('ignores the error for MESSAGES_LOAD_ERROR if there is no flag', () => {
    const existingState = Immutable.Map({"searching": true, "listing": false, "adding": false, "messages": Immutable.List(messages)})

    const action = {
      type: MESSAGES_LOAD_ERROR
    };

    expect(reducer(existingState, action)).toEqual(existingState);
  });

  it('marks as adding for CREATING_MESSAGE', () => {
    const existingState = Immutable.Map({"searching": true, "listing": false, "adding": false, "messages": Immutable.List(messages)})

    const action = {
      type: CREATING_MESSAGE
    };

    expect(reducer(existingState, action)).toEqual(
      Immutable.Map({"searching": true, "listing": false, "adding": true, "messages": Immutable.List(messages)})
    );
  });

  it('sets an error and marks adding as false a MESSAGE_CREATION_ERROR action', () => {
    const error = new Error("ugly error");
    const existingState = Immutable.Map({"searching": true, "listing": false, "adding": true, "messages": Immutable.List(messages)})

    const action = {
      type: MESSAGE_CREATION_ERROR,
      payload: error,
      error: true
    };

    expect(reducer(existingState, action)).toEqual(
      Immutable.Map({"searching": true, "listing": false, "adding": false, "messages": Immutable.List(messages), "error": error})
    );
  });

  it('ignores the error for MESSAGE_CREATION_ERROR if there is no flag', () => {
    const existingState = Immutable.Map({"searching": true, "listing": false, "adding": true, "messages": Immutable.List(messages)})

    const action = {
      type: MESSAGE_CREATION_ERROR
    };

    expect(reducer(existingState, action)).toEqual(existingState);
  });

  it('marks adding as false for MESSAGE_CREATED', () => {
    const existingState = Immutable.Map({"searching": true, "listing": false, "adding": true, "messages": Immutable.List(messages)})

    const action = {
      type: MESSAGE_CREATED
    };

    expect(reducer(existingState, action)).toEqual(
      Immutable.Map({"searching": true, "listing": false, "adding": false, "messages": Immutable.List(messages)})
    );
  });
});