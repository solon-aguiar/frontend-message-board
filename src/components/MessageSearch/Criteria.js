import './styles.css';
import React, { Component } from 'react';

export default class Criteria extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="c1pr40a">
        <div className="c12q1r7z">
          <h2 className="c17zq7b5">Messages</h2>
          <p>
            <span className="ca2ougy">There are </span>
            <span className="c1lerdlx">5</span>
            <span className="ca2ougy">messages showing</span>
          </p>
          <span role="progressbar" className="c1g8hd9e c1sg2lsz">
             <div className="c183ltat" style={{animationDelay: "-320ms", background: "black"}}></div>
             <div className="c183ltat" style={{animationDelay: "-160ms", background: "black"}}></div>
             <div className="c183ltat" style={{background: "black"}}></div>
          </span>
        </div>
        <div className="c7gtt9t">
          <div className="c1w33pjg">
            <label className="c1ug13ud" htmlFor="id-50854520">Search</label>
            <div className="c6v0e9l">
              <input type="search" className="cshm1e9" id="id-50854520" aria-controls="results" value=""/>
              <span role="progressbar" className="c1gyy91j c1sg2lsz">
                <div className="c183ltat" style={{animationDelay: "-320ms"}} />
                <div className="c183ltat" style={{animationDelay: "-160ms"}} />
                <div className="c183ltat" />
              </span>
            </div>
          </div>
          <div className="c1e30x2x">
            <label className="c1ug13ud" htmlFor="color-filter">Filter</label>
            <select className="cytasr3" aria-controls="results" id="color-filter">
              <option value="">All colors</option>
              <option value="#2795D9">Blue</option>
              <option value="#672d93">Purple</option>
              <option value="linear-gradient(to right, #e6e600, #f7941d 17%, #fff100 34%, #00a650 51%, #0054a5 68%, #672d93 85%, #672d93)">Rainbow</option>
            </select>
          </div>
        </div>
      </header>
    );
  }
}