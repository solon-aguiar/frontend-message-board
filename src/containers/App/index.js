'use strict';

import './styles.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as MessageActions from '../../actions/MessageActions';
import * as ColorActions from '../../actions/ColorActions';

import PageBanner from '../../components/PageBanner';
import CreateMessageWidget from '../../components/CreateMessageWidget';
import SearchMessagesWidget from '../../components/SearchMessagesWidget';

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.searchColors();
    this.props.searchMessages();
  }

  render() {
    const {colors, messages} = this.props;
    return (
      <div id="app">
        <main className="main">
          <div className="container">
            <PageBanner isLoading={colors.searching || messages.adding || messages.searching} />
            <CreateMessageWidget
              isReady={!colors.searching}
              colors={colors.colors}
              isAddingMessage={messages.adding}
              addMessage={this.props.createMessage} 
            />
            <SearchMessagesWidget
              abortExistingRequest={messages.abort}
              colors={colors.colors}
              messages={messages.messages}
              searchMessages={this.props.searchMessages}
              isSearching={messages.searching}
              isAdding={messages.adding}
            />
          </div>
        </main>
        <footer role="contentinfo" className="footer">
          <p>Made by Solon</p>
        </footer>
      </div>
    );
  }
};

App.propsTypes = {
  messages: PropTypes.shape({
    searching: PropTypes.bool.isRequired,
    adding: PropTypes.bool.isRequired,
    abort: PropTypes.shape,
    messages: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })).isRequired
  }).isRequired,
  colors: PropTypes.shape({
    searching: PropTypes.bool.isRequired,
    colors: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })).isRequired
  }).isRequired,
  searchMessages: PropTypes.func.isRequired,
  searchColors: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages.toJS(),
    colors: state.colors.toJS()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchColors: () => dispatch(ColorActions.searchColors()),
    createMessage: (content, color) => dispatch(MessageActions.createMessage(content, color)),
    searchMessages: (content, color) => dispatch(MessageActions.searchMessages(content, color))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
