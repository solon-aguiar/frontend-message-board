import './styles.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropdownList from '../DropdownList';
import LoadingIndicator from '../LoadingIndicator';

export default class Criteria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedColor: '',
      searchQuery: ''
    };

    this.onColorSelected = this.onColorSelected.bind(this);
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
  }

  handleSearchQueryChange(event) {
    const content = event.target.value;

    this.setState({
      searchQuery: content
    });
  }

  onColorSelected(color) {
    this.setState({
      selectedColor: color
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
      this.props.onChange(this.state.searchQuery, encodeURIComponent(this.state.selectedColor));
    }
  }

  render() {
    const { colors } = this.props;
    const colorsToDisplay = [{name: 'All colors', value: '', id:'fake-id'}].concat(colors);
    
    return (
      <div className="search-input-container">
        <div className="search-input-content-container">
          <label className="search-label">Search</label>
          <div className="search-input">
            <input type="search" className="search-input-component" value={this.state.searchQuery} onChange={this.handleSearchQueryChange} />

            {this.props.isSearching && !!this.state.searchQuery && <LoadingIndicator cssClass={"internal-loading-indicator-right"}/> }
          </div>
        </div>
        <div className="search-color">
          <label className="search-label">Filter</label>

          <DropdownList options={colorsToDisplay} onChange={this.onColorSelected} selected={this.state.selectedColor} />
        </div>
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