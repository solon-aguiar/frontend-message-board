import './styles.css';
import React, { Component } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import DropdownList from '../DropdownList';

export default class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      selectedOption: ''
    }

    this.onOptionSelected = this.onOptionSelected.bind(this);
  }

  onOptionSelected(option) {
    console.log("cheguei aqui com", option);
    this.setState({
      selectedOption: option
    });
  }

  render() {
    const {colors} = this.props;
    const colorsToDisplay = [{name: 'Choose a color...', value: '', id:'fake-id'}].concat(colors);
    
    return (
      <form className="c1pr40a">
        <fieldset className="c6xliwt">
          <legend className="c1rvp5fh">New message</legend>
          <p className="c1ouhqwa">Add a message and optionally pick a color.</p>
          <div className="c1u3f0g5">
            <div className="cz1obge">
              <div className="error touched">
                <label className="c1ug13ud" htmlFor="message">Message</label>
                <input id="message" className="cydik8e" value=""/>
                <div className="c11hehzj" role="alert">A message is required</div>
              </div>
              <div>
                <label className="c1ug13ud" htmlFor="color">Color</label>
                <DropdownList options={colorsToDisplay} onChange={this.onOptionSelected} />
              </div>
            </div>
            <div className="c7vrlqv">
              <button className="c13ogcrc" disabled={!this.state.canSubmit} type="submit">
                <LoadingIndicator cssClass={"internal-loading-indicator-center"} />
                <span style={{opacity: 0}}>Post message</span>
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}