import './styles.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MessageActions from '../../actions/MessageActions';
import * as ColorActions from '../../actions/ColorActions';
import Header from '../../components/Header';
import MessageForm from '../../components/MessageForm';
import Search from '../../components/Search';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.listColors();
    this.props.searchMessages();
  }

  render() {
    const {colors, messages} = this.props;
    return (
      <div id="app">
        <main className="main">
          <div className="container">
            <Header isLoading={colors.listing || messages.adding || messages.searching} />
            <MessageForm isReady={!colors.listing} colors={colors.colors} isAddingMessage={messages.adding} addMessage={this.props.createMessage} />
            <Search colors={colors.colors} messages={messages.messages} searchMessages={this.props.searchMessages} isSearching={messages.searching} isAdding={messages.adding} />
          </div>
        </main>
        <footer role="contentinfo" className="footer">
          <p>Made by Solon</p>
        </footer>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages.toJS(),
    colors: state.colors.toJS()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listColors: () => dispatch(ColorActions.listColors()),
    createMessage: (content, color) => dispatch(MessageActions.createMessage(content, color)),
    searchMessages: (content, color) => dispatch(MessageActions.searchMessages(content, color))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
