import './styles.css';
import React, { Component } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import DropdownList from '../DropdownList';

export default class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageContent: '',
      messageColor: '',
      hasError: false
    }

    this.onColorSelected = this.onColorSelected.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.handleMessageContentChange = this.handleMessageContentChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  onColorSelected(color) {
    this.setState({
      messageColor: color
    });
  }

  handleMessageContentChange(event) {
    const content = event.target.value;

    this.setState({
      messageContent: content,
      hasError: !content.trim()
    });
  }

  onBlur(event) {
    if (!this.state.messageContent.trim()) {
      this.setState({
        hasError: true
      });
    }
  }

  clearState() {
     this.setState({
      messageContent: '',
      messageColor: '',
      hasError: false
    });
  }

  onSubmit(event) {
    this.props.addMessage(this.state.messageContent, this.state.messageColor).then(() => {
      this.props.listMessages();
      this.clearState();
    });
  }

  canSubmit() {
    return !this.state.hasError && !!this.state.messageColor;
  }

  render() {
    const {colors} = this.props;
    const colorsToDisplay = [{name: 'Choose a color...', value: '', id:'fake-id'}].concat(colors);
    
    return (
      <div className="c1pr40a">
        <fieldset className="c6xliwt">
          <legend className="c1rvp5fh">New message</legend>
          <p className="c1ouhqwa">Add a message and optionally pick a color.</p>
          <div className="c1u3f0g5">
            <div className="cz1obge">
              <div className="error touched">
                <label className="c1ug13ud" htmlFor="message">Message</label>
                <input id="message" className="cydik8e" value={this.state.messageContent} onChange={this.handleMessageContentChange} onBlur={this.onBlur}/>
                {this.state.hasError && <div className="c11hehzj" role="alert">A message is required</div>}
              </div>
              <div>
                <label className="c1ug13ud" htmlFor="color">Color</label>
                <DropdownList options={colorsToDisplay} onChange={this.onColorSelected} selected={this.state.messageColor} />
              </div>
            </div>
            <div className="c7vrlqv">
              <button className="c13ogcrc" disabled={!this.canSubmit()} type="submit" onClick={this.onSubmit}>
                {this.props.isAddingMessage && <LoadingIndicator cssClass={"internal-loading-indicator-center"} /> }
                <span style={{opacity: 10}}>Post message</span>
              </button>
            </div>
          </div>
        </fieldset>
      </div>
    )
  }
}