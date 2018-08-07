'use strict';

import Colors from '../../Colors';

describe('Colors', () => {
  const mockResponse = 'my-fake-response';

  describe('get', () => {
    it('calls the HttpService for the resource', () => {
      const fetchMock = jest.fn().mockReturnValue(mockResponse);
      const subject = new Colors(fetchMock);

      const colors = subject.get();
      expect(colors).toEqual(mockResponse);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual('/colors');
    });
  });

});