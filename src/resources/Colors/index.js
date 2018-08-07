'use strict';

import HttpService from '../../services/HttpService';

export default class Colors extends HttpService {
  constructor(fetch) {
    super(fetch, '');
    this.path = '/colors';
  }

  get() {
    return super.get(this.path);
  }
}
