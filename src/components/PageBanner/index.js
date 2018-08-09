import './styles.css';
import React, { Component } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import PropTypes from 'prop-types';

export default function PageBanner(props) {
  return (
    <header className="header">
      <div className="header-title-container">
        <h1 className="header-title">Message board</h1>
        {props.isLoading && (
          <LoadingIndicator background={true} cssClass={"companion-loading-indicator"} />
        )}
      </div>
      <p className="header-info">A place to post and read messages.</p>
    </header>
  )
}

PageBanner.propsTypes = {
  isLoading: PropTypes.bool.isRequired
};