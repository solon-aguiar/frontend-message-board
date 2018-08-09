import './styles.css';
import React, { Component } from 'react';

export default class PaginatedMessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="ccqw98a" aria-live="polite" async="" id="results" role="region">
        {this.props.messages.map(m =>
          <li className="cvvv1yb" style={{background: m.color}} key={m.id}>{m.content}</li>  
        )}
      </ul>
    );
  }
}