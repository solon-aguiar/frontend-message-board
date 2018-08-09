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
      messageContent: ''
    };

    this.onColorSelected = this.onColorSelected.bind(this);
    this.handleMessageContentChange = this.handleMessageContentChange.bind(this);
  }

  handleMessageContentChange(event) {
    const content = event.target.value;

    this.setState({
      messageContent: content
    });
  }

  onColorSelected(color) {
    this.setState({
      selectedColor: color
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedColor != this.state.selectedColor || prevState.messageContent != this.state.messageContent) {
      if (this.props.abortExistingRequest) {
        this.props.abortExistingRequest.abort();
      }
      this.props.onChange(this.state.messageContent, encodeURIComponent(this.state.selectedColor));
    }
    if (!!prevProps.isAdding && !this.props.isAdding) {
      if (this.props.abortExistingRequest) {
        this.props.abortExistingRequest.abort()
      }
      this.props.onChange(this.state.messageContent, encodeURIComponent(this.state.selectedColor));
    }
  }

  render() {
    const {colors} = this.props;
    const colorsToDisplay = [{name: 'All colors', value: '', id:'fake-id'}].concat(colors);
    
    return (
      <div className="search-input-container">
        <div className="search-input-content-container">
          <label className="search-label">Search</label>
          <div className="search-input">
            <input type="search" className="search-input-component" value={this.state.messageContent} onChange={this.handleMessageContentChange} />
            {this.props.isSearching && !!this.state.messageContent && <LoadingIndicator cssClass={"internal-loading-indicator-right"}/> }
          </div>
        </div>
        <div className="search-color">
          <label className="search-label">Filter</label>
          <DropdownList options={colorsToDisplay} onChange={this.onColorSelected} selected={this.state.selectedColor}/>
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
  isAdding: PropTypes.bool.isRequired
};