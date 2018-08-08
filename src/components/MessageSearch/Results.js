import './styles.css';
import React, { Component } from 'react';

export default class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("estou aqui com ", this.props);
    return (
      <ul className="ccqw98a" aria-live="polite" async="" id="results" role="region">
        {this.props.messages.map(m =>
          <li className="cvvv1yb" style={{background: m.color}} key={m.id}>{m.content}</li>  
        )}
      </ul>
    );
  }
}