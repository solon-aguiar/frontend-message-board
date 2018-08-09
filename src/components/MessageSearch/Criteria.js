import './styles.css';
import React, { Component } from 'react';

import DropdownList from '../DropdownList';
import LoadingIndicator from '../LoadingIndicator';

export default class Criteria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
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
      selectedOption: color
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedOption != this.state.selectedOption || prevState.messageContent != this.state.messageContent) {
      this.props.onChange(this.state.messageContent, encodeURIComponent(this.state.selectedOption));
    }
  }

  render() {
    const {colors} = this.props;
    const colorsToDisplay = [{name: 'All colors', value: '', id:'fake-id'}].concat(colors);
    
    return (
      <div className="c7gtt9t">
        <div className="c1w33pjg">
          <label className="c1ug13ud" htmlFor="id-50854520">Search</label>
          <div className="c6v0e9l">
            <input type="search" className="cshm1e9" id="id-50854520" value={this.state.messageContent} onChange={this.handleMessageContentChange} aria-controls="results"/>
            {this.props.isSearching && !!this.state.messageContent && <LoadingIndicator cssClass={"internal-loading-indicator-right"}/> }
          </div>
        </div>
        <div className="c1e30x2x">
          <label className="c1ug13ud" htmlFor="color-filter">Filter</label>
          <DropdownList options={colorsToDisplay} onChange={this.onColorSelected} selected={this.state.selectedOption}/>
        </div>
      </div>
    );
  }
}