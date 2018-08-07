'use strict';

import HttpService from '../../HttpService';

describe('HttpService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('get', () => {
    it('calls fetch with the combined URL', () => {
      const fetchMock = jest.fn();
      const subject = new HttpService(fetchMock, 'my-url');

      subject.get('/messages', 'q=true');

      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(`my-url/messages?q=true`);
    });
  });

  describe('post', () => {
    it('adds headers, body and method to the fetch request', () => {
      const fetchMock = jest.fn();
      const subject = new HttpService(fetchMock, 'my-url');
      const body = {
        content: 'batman',
        color: 'gray'
      };

      subject.post('/messages', body);

      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(`my-url/messages`);
      expect(fetchMock.mock.calls[0][1]).toEqual({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"content":"batman","color":"gray"}' 
      });
    });
  });
});