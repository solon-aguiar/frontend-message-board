'use strict';

export default class HttpService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path, queryParams = undefined) {
    const fullUrl = queryParams ? `${this.baseUrl}${path}?${queryParams}` : `${this.baseUrl}${path}`;
    return fetch(fullUrl);
  }

  post(path, body) {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...body
      })
    });
  }
}
