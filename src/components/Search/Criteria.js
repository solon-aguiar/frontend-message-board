'use strict'

import './styles.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropdownList from '../DropdownList';
import LoadingIndicator from '../LoadingIndicator';
import MessageContentInput from '../MessageContentInput';
import MessageColorInput from '../MessageColorInput';

export default class Criteria extends Component {
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

  componentDidUpdate(prevProps, prevState) {
    if (this.changedSearchParameters(prevProps, prevState) || this.createdNewMessages(prevProps)) {
      this.abortExistingSearches();
      this.props.onChange(encodeURIComponent(this.state.searchQuery), encodeURIComponent(this.state.selectedColor));
    }
  }

  render() {
    return (
      <div className="search-input-container">
        <MessageContentInput
          label={"Search"}
          content={this.state.searchQuery}
          onChange={this.handleSearchQueryChange}
          showLoading={this.props.isSearching && this.state.triggeredQuerySearch}
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
    );
  }
}

Criteria.propsTypes = {
  colors: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired,
  abortExistingRequest: PropTypes.func
};