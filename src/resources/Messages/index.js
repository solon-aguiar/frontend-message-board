'use strict';

import HttpService from '../../services/HttpService';

class Messages {
  constructor() {
    this.service = new HttpService("");
    this.path = '/messages';
  }

  get(searchText = undefined, color = undefined) {
    let queryString = undefined;
    if (searchText) {
      queryString = `_sort=id&_order=desc&q=${searchText}`;
    }
    if (color) {
      queryString += `&color=${color}`;
    }

    return this.service.get(this.path, queryString);
  }

  create(content, color) {
    return this.service.post(this.path, {
      content,
      color
    });
  }
}

export default new Messages();
