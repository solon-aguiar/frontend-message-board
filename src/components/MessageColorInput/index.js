'use strict'
import './styles.css';

import React from 'react';
import PropTypes from 'prop-types';

import DropdownList from '../DropdownList';

export default function MessageColorInput(props) {
  const optionsToDisplay = [{name: props.defaultOption, value: '', id:'fake-id'}].concat(props.options);

  return (
    <div className={props.style}>
      <label className="search-label">{props.label}</label>

      <DropdownList options={optionsToDisplay} onChange={props.onSelect} selected={props.selected} />
    </div>
  );
}

MessageColorInput.propsTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  defaultOption: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.string
};
