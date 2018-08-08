import './styles.css';
import React, { Component } from 'react';
import LoadingIndicator from '../LoadingIndicator';

export default class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,

    }
  }

  render() {
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
                <select id="color" className="cytasr3">
                  <option>Choose a color...</option>
                  <option value="#2795D9">Blue</option>
                  <option value="#672d93">Purple</option>
                  <option value="linear-gradient(to right, #e6e600, #f7941d 17%, #fff100 34%, #00a650 51%, #0054a5 68%, #672d93 85%, #672d93)">Rainbow</option>
                </select>
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