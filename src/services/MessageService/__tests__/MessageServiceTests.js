'use strict';

import MessageService from '../../MessageService';

describe('MessageService', () => {
  const mockResponse = 'my-fake-response';

  describe('get', () => {
    it('calls the HttpService with a search query', () => {
      const fetchMock = jest.fn().mockReturnValue(mockResponse);
      const subject = new MessageService(fetchMock);

      const messages = subject.get('my-query-string', 'blue');
      expect(messages).toEqual(mockResponse);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(`/messages?_sort=id&_order=desc&q=my-query-string&color=blue`);
    });
  });

  describe('create', () => {
    it('uses the HttpService', () => {
      const fetchMock = jest.fn().mockReturnValue(mockResponse);
      const subject = new MessageService(fetchMock);

      const messages = subject.create('content', 'blue');
      expect(messages).toEqual(mockResponse);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(`/messages`);
      expect(fetchMock.mock.calls[0][1]).toEqual({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"content":"content","color":"blue"}' 
      });
    });
  });
});