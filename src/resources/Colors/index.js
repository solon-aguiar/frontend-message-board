'use strict';

import HttpService from '../../services/HttpService';

class Colors {
  constructor(fetch) {
    this.service = new HttpService('');
    this.path = '/colors';
  }

  get() {
    return this.service.get(this.path);
  }
}

export default new Colors();
