import './styles.css';
import React, { Component } from 'react';

export default class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="ccqw98a" aria-live="polite" async="" id="results" role="region">
        <li className="cvvv1yb" style={{background: 'rgb(39, 149, 217)'}}>It always seems impossible until it is done.</li>
        <li className="cvvv1yb" style={{background: 'rgb(103, 45, 147)'}}>Positive thinking will let you do everything better than negative thinking will.</li>
        <li className="cvvv1yb">Without darkness there can be no light.</li>
        <li className="cvvv1yb" style={{background: 'linear-gradient(to right, rgb(230, 230, 0), rgb(247, 148, 29) 17%, rgb(255, 241, 0) 34%, rgb(0, 166, 80) 51%, rgb(0, 84, 165) 68%, rgb(103, 45, 147) 85%, rgb(103, 45, 147))'}}>It takes sunshine and rain to make a rainbow.</li>
      </ul>
    );
  }
}