'use strict';

export default class HttpService {
  constructor(fetch, baseUrl) {
    this.baseUrl = baseUrl;
    this.fetch = fetch;
  }

  get(path, queryParams) {
    const fullUrl = queryParams ? `${this.baseUrl}${path}?${queryParams}` : `${this.baseUrl}${path}`;
    return this.fetch(fullUrl);
  }

  post(path, body) {
    return this.fetch(`${this.baseUrl}${path}`, {
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
