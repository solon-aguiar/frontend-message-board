'use strict'
import './styles.css';

import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../LoadingIndicator';

export default function MessageContentInput(props) {
  return (
    <div className="input-content-container touched">
      <label className="label">{props.label}</label>
      <div className="input-div">
        <input type="search" className="input-component" value={props.content} onChange={props.onChange} onBlur={props.onBlur} />
        {!!props.showLoading && <LoadingIndicator cssClass={"internal-loading-indicator-right"}/> }
      </div>
      {!!props.showError && <div className="error-message" role="alert">{props.errorMessage}</div>}
    </div>
  );
}

MessageContentInput.propsTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  showLoading: PropTypes.bool,
  showError: PropTypes.bool,
  errorMessage: PropTypes.string
};

MessageContentInput.defaultProps = {
  showLoading: false,
  showError: false,
  errorMessage: ''
};
