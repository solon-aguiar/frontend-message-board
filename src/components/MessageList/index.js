import './styles.css';

import React from 'react';
import PropTypes from 'prop-types';

import ClinikoButton from '../ClinikoButton';

export default function MessageList(props) {
  return (
    <div>
      <ul className="results-list" aria-live="polite" async="" id="results" role="region">
        {props.messages.map(m =>
          <li className="message-entry" style={{background: m.color}} key={m.id}>{m.content}</li>  
        )}
      </ul>
    </div>
  );
}

MessageList.propsTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired
};