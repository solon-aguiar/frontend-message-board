'use strict';

import HttpService from '../../services/HttpService';

class Colors extends HttpService {
  constructor(fetch) {
    super('');
    this.path = '/colors';
  }

  get() {
    return super.get(this.path);
  }
}

export default new Colors();
