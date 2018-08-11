'use strict'
import './styles.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../LoadingIndicator';

export default function ClinikoButton(props) {
  const textOpacity = !!props.showLoadingIndicator ? 0 : 10;

  return(
    <button className="message-content-submit message-submit-button" disabled={props.disabled} type="submit" onClick={props.onClick}>
      {!!props.showLoadingIndicator && <LoadingIndicator cssClass={"internal-loading-indicator-center"} /> }
      <span style={{opacity: textOpacity}}>{props.text}</span>
    </button>
  );
}

ClinikoButton.propsTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  showLoadingIndicator: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};