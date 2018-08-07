'use strict';

import HttpService from '../../services/HttpService';

class Messages extends HttpService {
  constructor() {
    super('');
    this.path = '/messages';
  }

  get(searchText, color) {
    return super.get(this.path, `_sort=id&_order=desc&q=${searchText}&color=${color}`);
  }

  create(content, color) {
    return super.post(this.path, {
      content,
      color
    });
  }
}

export default new Messages();
