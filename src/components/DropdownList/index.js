import './styles.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DropdownList extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;

    this.props.onChange(value);
  }

  render() {
    return (
      <select className="dropdown" value={this.props.selected} onChange={this.handleChange}>
        {this.props.options.map(op =>
          <option value={op.value} key={op.id}>{op.name}</option>
        )}
      </select>
    );
  }
};

DropdownList.propsTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}