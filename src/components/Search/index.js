import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Criteria from './Criteria';
import LoadingIndicator from '../LoadingIndicator';
import PaginatedMessageList from '../PaginatedMessageList';

export default function Search(props) {
  return (
    <section>
      <header className="header">
        <div className="info-panel">
          <h2 className="header-text">Messages</h2>
          <span className="header-text-number">{props.messages.length}</span>
          {props.isSearching && <LoadingIndicator background={true} cssClass={"companion-loading-indicator"} /> }
        </div>
        <Criteria colors={props.colors} onChange={props.searchMessages} isSearching={props.isSearching}/>
      </header>
      <PaginatedMessageList messages={props.messages} />
    </section>
  );
}

Search.propsTypes = {
  colors: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  searchMessages: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired
};