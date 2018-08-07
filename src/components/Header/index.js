import './styles.css';
import React, { Component } from 'react';

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
            <span role="progressbar" className="c1g8hd9e c1sg2lsz">
              <div className="c183ltat" style={{animationDelay: "-320ms", background: "black"}}></div>
              <div className="c183ltat" style={{animationDelay: "-160ms", background: "black"}}></div>
              <div className="c183ltat" style={{background: "black"}}></div>
            </span>
          )}
        </div>
        <p className="cp6shng">A place to post and read messages.</p>
      </header>
    )
  }
}