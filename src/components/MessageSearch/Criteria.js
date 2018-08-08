import './styles.css';
import React, { Component } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import DropdownList from '../DropdownList';

export default class Criteria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: ''
    }

    this.onOptionSelected = this.onOptionSelected.bind(this);
  }

  onOptionSelected(option) {
    console.log("cheguei aqui no outro", option);
    this.setState({
      selectedOption: option
    });
  }

  render() {
    const {colors} = this.props;
    const colorsToDisplay = [{name: 'All colors', value: '', id:'fake-id'}].concat(colors);
    
    return (
      <header className="c1pr40a">
        <div className="c12q1r7z">
          <h2 className="c17zq7b5">Messages</h2>
          <p>
            <span className="ca2ougy">There are </span>
            <span className="c1lerdlx">5</span>
            <span className="ca2ougy">messages showing</span>
          </p>

          <LoadingIndicator background={true} cssClass={"companion-loading-indicator"} />
        </div>
        <div className="c7gtt9t">
          <div className="c1w33pjg">
            <label className="c1ug13ud" htmlFor="id-50854520">Search</label>
            <div className="c6v0e9l">
              <input type="search" className="cshm1e9" id="id-50854520" aria-controls="results" value=""/>
              <LoadingIndicator cssClass={"internal-loading-indicator-right"}/>
            </div>
          </div>
          <div className="c1e30x2x">
            <label className="c1ug13ud" htmlFor="color-filter">Filter</label>
            <DropdownList options={colorsToDisplay} onChange={this.onOptionSelected} />
          </div>
        </div>
      </header>
    );
  }
}