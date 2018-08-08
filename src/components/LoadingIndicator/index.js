import './styles.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function LoadingIndicator(props) {
  const cssColor = props.background ? {background: "black"} : undefined;

  return (
    <span role="progressbar" className={`${props.cssClass} webkit-adjust`}>
      <div className="blue-dot" style={{animationDelay: "-320ms", ...cssColor}} />
      <div className="blue-dot" style={{animationDelay: "-160ms", ...cssColor}} />
      <div className="blue-dot" style={cssColor} />
    </span>
  );
}

LoadingIndicator.propsTypes = {
  cssClass: PropTypes.string,
  background: PropTypes.bool
};

LoadingIndicator.defaultProps = {
  cssClass: 'internal-loading-indicator-center',
  background: false
};