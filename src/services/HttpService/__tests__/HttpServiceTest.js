'use strict';

import HttpService from '../../HttpService';

describe('HttpService', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  const mockResponse = '{my-response: true}';

  describe('get', () => {
    it('calls fetch with the combined URL', () => {
      fetch.mockResponse(mockResponse);

      const subject = new HttpService('my-url');

      subject.get('/messages', 'q=true').then(response => {
        expect(response.body).toEqual(mockResponse);
      });

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0]).toEqual([`my-url/messages?q=true`, {}]);
    });

    it('ignores queryParameters in the url if not present', () => {
      fetch.mockResponse(mockResponse);

      const subject = new HttpService('my-url');

      subject.get('/messages').then(response => {
        expect(response.body).toEqual(mockResponse);
      });

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0]).toEqual(['my-url/messages', {}]);
    });

    it('ignores empty queryParameters in the url', () => {
      fetch.mockResponse(mockResponse);

      const subject = new HttpService('my-url');

      subject.get('/messages', '').then(response => {
        expect(response.body).toEqual(mockResponse);
      });

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0]).toEqual(['my-url/messages', {}]);
    });

    it('uses a fetch signal if provided', () => {
      fetch.mockResponse(mockResponse);

      const subject = new HttpService('my-url');

      subject.get('/messages', undefined, 'signal').then(response => {
        expect(response.body).toEqual(mockResponse);
      });

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('my-url/messages', {signal: 'signal'});
    })
  });

  describe('post', () => {
    it('adds headers, body and method to the fetch request', () => {
      fetch.mockResponse(mockResponse);

      const subject = new HttpService('my-url');
      const body = {
        content: 'batman',
        color: 'gray'
      };

      subject.post('/messages', body).then(response => {
        expect(response.body).toEqual(mockResponse);
      });

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`my-url/messages`);
      expect(fetch.mock.calls[0][1]).toEqual({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"content":"batman","color":"gray"}' 
      });
    });
  });
});