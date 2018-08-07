'use strict';

import Messages from '../../Messages';

describe('Messages', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  const mockResponse = '{my-response: true}';

  describe('get', () => {
    it('calls the HttpService with a search query', () => {
      fetch.mockResponse(mockResponse);

      Messages.get('my-query-string', 'blue').then(response => {
        expect(response.body).toEqual(mockResponse);
      });
      
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`/messages?_sort=id&_order=desc&q=my-query-string&color=blue`);
    });
  });

  describe('create', () => {
    it('uses the HttpService', () => {
      fetch.mockResponse(mockResponse);

      Messages.create('content', 'blue').then(response => {
        expect(response.body).toEqual(mockResponse);
      });
      
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`/messages`);
      expect(fetch.mock.calls[0][1]).toEqual({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"content":"content","color":"blue"}' 
      });
    });
  });
});