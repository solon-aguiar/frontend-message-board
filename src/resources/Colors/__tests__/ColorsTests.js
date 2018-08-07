'use strict';

import Colors from '../../Colors';

describe('Colors', () => {
  const mockResponse = '{my-fake-response:true}';

  describe('get', () => {
    it('calls the HttpService for the resource', () => {
      fetch.mockResponse(mockResponse);

      Colors.get().then(response => {
        expect(response.body).toEqual(mockResponse)}
      );

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('/colors');
    });
  });

});