import './styles.css';
import React, { Component } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import PropTypes from 'prop-types';

export default function ClinikoButton(props) {
  return(
    <button className="message-content-submit message-submit-button" disabled={props.disabled} type="submit" onClick={props.onClick}>
      {props.showLoadingIndicator && <LoadingIndicator cssClass={"internal-loading-indicator-center"} /> }
      <span style={{opacity: 10}}>{props.text}</span>
    </button>
  );
}

ClinikoButton.propsTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  showLoadingIndicator: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};