import './styles.css';
import React, { Component } from 'react';
import LoadingIndicator from '../LoadingIndicator';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="c1pr40a">
        <div className="cynqhgr">
          <h1 className="c17defmp">Message board</h1>
          {this.props.isLoading && (
            <LoadingIndicator background={true} cssClass={"companion-loading-indicator"} />
          )}
        </div>
        <p className="cp6shng">A place to post and read messages.</p>
      </header>
    )
  }
}