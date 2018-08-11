'use strict';

import HttpService from '../../services/HttpService';

class Messages {
  constructor() {
    this.service = new HttpService("");
    this.path = '/api/messages';
  }

  get(searchText = undefined, color = undefined, abort = undefined) {
    let queryString = "_sort=id&_order=desc";

    if (!!searchText) {
      queryString += `&q=${searchText}`;
    }
    if (!!color) {
      queryString += `&color=${color}`;
    }

    return this.service.get(this.path, queryString, abort);
  }

  create(content, color) {
    return this.service.post(this.path, {
      content,
      color
    });
  }
}

export default new Messages();
