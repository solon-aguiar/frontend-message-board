import React, { Component } from 'react';
import Criteria from './Criteria';
import Results from './Results';

export default class MessageSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <Criteria />
        <Results />
      </section>
    );
  }
}