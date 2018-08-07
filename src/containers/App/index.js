import React, { Component } from 'react';
//import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import {listMessages} from '../../actions/MessageActions';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.props.getMessages();
  }

  render() {
    return (
      <div>
        My App.
      </div>
    );
  }
};

const mapStateToProps = (state) => {
   console.log("state", state.messages);
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMessages: () => dispatch(listMessages())
        //fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
