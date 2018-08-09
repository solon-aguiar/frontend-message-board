import './styles.css';
import React, { Component } from 'react';
import ClinikoButton from '../ClinikoButton';
import PropTypes from 'prop-types';

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

PaginatedMessageList.propsTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  pageSize: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
};