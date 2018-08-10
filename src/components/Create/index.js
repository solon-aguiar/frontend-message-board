'use strict'

import './styles.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../LoadingIndicator';
import DropdownList from '../DropdownList';
import ClinikoButton from '../ClinikoButton';

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageContent: '',
      messageColor: '',
      hasMessageContentError: false
    }

    this.onColorSelected = this.onColorSelected.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.handleMessageContentChange = this.handleMessageContentChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  onColorSelected(color) {
    this.setState({
      messageColor: color
    });
  }

  handleMessageContentChange(event) {
    const content = event.target.value;

    this.setState({
      messageContent: content,
      hasMessageContentError: !content.trim()
    });
  }

  onBlur(event) {
    if (!this.state.messageContent.trim()) {
      this.setState({
        hasMessageContentError: true
      });
    }
  }

  clearState() {
    this.setState({
      messageContent: '',
      messageColor: '',
      hasMessageContentError: false
    });
  }

  onSubmit(event) {
    this.props.addMessage(this.state.messageContent, this.state.messageColor).then(() => {
      this.clearState();
    });
  }

  canSubmit() {
    return !this.state.hasMessageContentError && !!this.state.messageColor;
  }

  render() {
    const { colors } = this.props;
    const colorOptions = [{name: 'Choose a color...', value: '', id:'fake-id'}].concat(colors);
    
    return (
      <div className="message-form">
        <fieldset className="fields">
          <legend className="legend">New message</legend>
          <p className="toltip">Add a message and optionally pick a color.</p>
          <div className="fields-container">
            <div className="message-content-container">
              <div className="message-content-field-container touched">
                <label className="message-content-field-label">Message</label>
                <input id="message" className="message-content" value={this.state.messageContent} onChange={this.handleMessageContentChange} onBlur={this.onBlur}/>

                {this.state.hasMessageContentError && <div className="error-message" role="alert">A message is required</div>}
              </div>

              <div>
                <label className="message-content-field-label">Color</label>
                <DropdownList options={colorOptions} onChange={this.onColorSelected} selected={this.state.messageColor} />
              </div>
            </div>
            <ClinikoButton disabled={!this.canSubmit()} onClick={this.onSubmit} showLoadingIndicator={this.props.isAddingMessage} text={"Post Message"} />
          </div>
        </fieldset>
      </div>
    )
  }
}

Create.propsTypes = {
  colors: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  addMessage: PropTypes.func.isRequired,
  isAddingMessage: PropTypes.bool.isRequired
};