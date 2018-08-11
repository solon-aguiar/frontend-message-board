'use strict'

import './styles.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropdownList from '../DropdownList';
import LoadingIndicator from '../LoadingIndicator';
import MessageContentInput from '../MessageContentInput';
import MessageColorInput from '../MessageColorInput';
import MessageList from '../MessageList';

function InfoPanel(props) {
  return (
    <div className="info-panel">
      <h2 className="header-text">Messages</h2>
      <span className="header-text-number">{props.nMessages}</span>
      {!!props.isLoading && <LoadingIndicator background={true} cssClass={"companion-loading-indicator"} /> }
    </div>
  );
}

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedColor: '',
      searchQuery: '',
      triggeredQuerySearch: false
    };

    this.onColorSelected = this.onColorSelected.bind(this);
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
  }

  handleSearchQueryChange(event) {
    const content = event.target.value;

    this.setState({
      searchQuery: content,
      triggeredQuerySearch: true
    });
  }

  onColorSelected(color) {
    this.setState({
      selectedColor: color,
      triggeredQuerySearch: false
    });
  }

  createdNewMessages(prevProps) {
    return !!prevProps.isAdding && !this.props.isAdding
  }

  hasOutstandingSearchRequest() {
    return !!this.props.abortExistingRequest;
  }

  changedSearchParameters(prevProps, prevState) {
    return prevState.selectedColor != this.state.selectedColor || prevState.searchQuery != this.state.searchQuery
  }

  abortExistingSearches() {
    if (this.hasOutstandingSearchRequest()) {
      this.props.abortExistingRequest.abort();
    }
  }

  isSearchQuery() {
    return this.state.triggeredQuerySearch || !!this.state.searchQuery;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.changedSearchParameters(prevProps, prevState) || this.createdNewMessages(prevProps)) {
      this.abortExistingSearches();
      this.props.searchMessages(encodeURIComponent(this.state.searchQuery), encodeURIComponent(this.state.selectedColor));
    }
  }

  render() {
    return (
      <section>
        <header className="header">
          <InfoPanel isLoading={this.props.isSearching} nMessages={!!this.props.messages ? this.props.messages.length : 0} />

          <div className="search-input-container">
            <MessageContentInput
              label={"Search"}
              content={this.state.searchQuery}
              onChange={this.handleSearchQueryChange}
              showLoading={this.props.isSearching && this.isSearchQuery()}
              showError={false}
            />
            <MessageColorInput
              defaultOption={'All colors'}
              style={"search-color"}
              label={"Filter"}
              options={this.props.colors}
              onSelect={this.onColorSelected}
              selected={this.state.selectedColor}
            />
          </div>
        </header>
        <MessageList messages={this.props.messages} />
      </section>
    );
  }
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
  LoadingIndicator: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired,
  abortExistingRequest: PropTypes.func,
  isSearching: PropTypes.bool.isRequired
};
