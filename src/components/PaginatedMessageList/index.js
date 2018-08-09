import './styles.css';
import React, { Component } from 'react';
import ClinikoButton from '../ClinikoButton';

//{!!this.props.messages.length && <ClinikoButton disabled={false} onClick={() => undefined} showLoadingIndicator={false} text={"loadMode"} /> }

export default class PaginatedMessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul className="results-list" aria-live="polite" async="" id="results" role="region">
          {this.props.messages.map(m =>
            <li className="message-entry" style={{background: m.color}} key={m.id}>{m.content}</li>  
          )}
        </ul>
        
      </div>
    );
  }
}