import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MessageActions from '../../actions/MessageActions';
import * as ColorActions from '../../actions/ColorActions';
import Header from '../../components/Header';
import MessageForm from '../../components/MessageForm';
import MessageSearch from '../../components/MessageSearch';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.listColors();
    this.props.listMessages();
  }

  render() {
    console.log("props", this.props);
    const {colors, messages} = this.props;
    return (
      <div id="app">
        <main className="cc0img9">
          <div className="cgmxdsh">
            <Header isLoading={colors.listing || messages.listing || messages.adding || messages.searching} />
            <MessageForm isReady={!colors.listing} colors={colors.colors} isAddingMessage={messages.adding} addMessage={this.props.createMessage} listMessages={this.props.listMessages} />
            <MessageSearch colors={colors.colors} messages={messages.messages} />
          </div>
        </main>
        <footer role="contentinfo" className="c1tr6g77">
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
    listMessages: () => dispatch(MessageActions.listMessages()),
    listColors: () => dispatch(ColorActions.listColors()),
    createMessage: (content, color) => dispatch(MessageActions.createMessage(content, color)),
    searchMessages: (content, color) => dispatch(MessageActions.searchMessages(content, color))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
