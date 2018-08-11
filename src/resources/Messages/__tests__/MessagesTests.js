'use strict';

import Messages from '../../Messages';

describe('Messages', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  const mockResponse = '{my-response: true}';

  describe('get', () => {
    it('always uses query string when getting messages', () => {
      fetch.mockResponse(mockResponse);

      Messages.get().then(response => {
        expect(response.body).toEqual(mockResponse);
      });
      
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`/api/messages?_sort=id&_order=desc`);
    });

    it('calls the HttpService with a text query if specified content', () => {
      fetch.mockResponse(mockResponse);

      Messages.get('my-query-string').then(response => {
        expect(response.body).toEqual(mockResponse);
      });
      
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`/api/messages?_sort=id&_order=desc&q=my-query-string`);
    });

    it('calls the HttpService with a color query if specified content', () => {
      fetch.mockResponse(mockResponse);

      Messages.get('', 'my-query-string').then(response => {
        expect(response.body).toEqual(mockResponse);
      });
      
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`/api/messages?_sort=id&_order=desc&color=my-query-string`);
    });

    it('calls the HttpService with a full search query', () => {
      fetch.mockResponse(mockResponse);

      Messages.get('my-query-string', 'blue').then(response => {
        expect(response.body).toEqual(mockResponse);
      });
      
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`/api/messages?_sort=id&_order=desc&q=my-query-string&color=blue`);
    });

    it('calls the HttpService with a signal if provided', () => {
      fetch.mockResponse(mockResponse);

      Messages.get('my-query-string', 'blue', 'my-signal').then(response => {
        expect(response.body).toEqual(mockResponse);
      });
      
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`/api/messages?_sort=id&_order=desc&q=my-query-string&color=blue`, {signal: 'my signal'});
    });
  });

  describe('create', () => {
    it('uses the HttpService', () => {
      fetch.mockResponse(mockResponse);

      Messages.create('content', 'blue').then(response => {
        expect(response.body).toEqual(mockResponse);
      });
      
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`/api/messages`);
      expect(fetch.mock.calls[0][1]).toEqual({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"content":"content","color":"blue"}' 
      });
    });
  });
});