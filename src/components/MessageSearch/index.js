import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Criteria from './Criteria';
import LoadingIndicator from '../LoadingIndicator';
import PaginatedMessageList from '../PaginatedMessageList';

export default class MessageSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <header className="header">
          <div className="info-panel">
            <h2 className="header-text">Messages</h2>
            <span className="header-text-number">{this.props.messages.length}</span>
            {this.props.isSearching && <LoadingIndicator background={true} cssClass={"companion-loading-indicator"} /> }
          </div>
          <Criteria colors={this.props.colors} onChange={this.props.searchMessages} isSearching={this.props.isSearching}/>
        </header>
        <PaginatedMessageList messages={this.props.messages} />
      </section>
    );
  }
}

MessageSearch.propsTypes = {
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