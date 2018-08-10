import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import { App } from '../../App';
import PageBanner from '../../../components/PageBanner';
import Create from '../../../components/Create';
import Search from '../../../components/Search';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  const colors = [
    {
      id: 1,
      value: 'value1',
      name: 'Value 1'
    },
    {
      id: 2,
      value: 'value2',
      name: 'Value 2'
    }
  ];

  const messages = [
    {
      id: 1,
      content: 'content1',
      color: 'value1'
    },
    {
      id: 2,
      content: 'content 2',
      color: 'value2'
    }
  ];
  const searchMessagesMock = jest.fn();
  const searchColorsMock = jest.fn();
  const createMessageMock = jest.fn();
  const abortMock = jest.fn();

  afterEach(() => {
    searchMessagesMock.mockReset();
    searchColorsMock.mockReset();
  });

  it('renders all parts of the page with props', () => {
    const enzymeWrapper = shallow(<App messages={{messages:messages, adding:false, searching:false, abort: abortMock}} colors={{colors:colors, searching: false}} searchMessages={searchMessagesMock} searchColors={searchColorsMock} createMessage={createMessageMock} />);

    expect(enzymeWrapper.find(PageBanner).exists()).toBe(true);
    expect(enzymeWrapper.find(Create).exists()).toBe(true);
    expect(enzymeWrapper.find(Search).exists()).toBe(true);

    expect(enzymeWrapper.find(PageBanner).prop('isLoading')).toBe(false);
    expect(enzymeWrapper.find(Create).props()).toEqual({isReady: true, colors: colors, isAddingMessage:false, addMessage:createMessageMock});
    expect(enzymeWrapper.find(Search).props()).toEqual({messages: messages, colors: colors, isSearching:false, isAdding:false, searchMessages:searchMessagesMock, abortExistingRequest: abortMock});
  });

  it('searches for messages and colors on start', () => {
    const enzymeWrapper = shallow(<App messages={{messages:messages, adding:false,searching:false}} colors={{colors:colors, searching: false}} searchMessages={searchMessagesMock} searchColors={searchColorsMock} createMessage={createMessageMock} />);

    expect(searchMessagesMock.mock.calls.length).toBe(1);
    expect(searchMessagesMock.mock.calls[0]).toEqual([]);

    expect(searchColorsMock.mock.calls.length).toBe(1);
    expect(searchColorsMock.mock.calls[0]).toEqual([]);
  });

  describe('.PageBanner', () => {
    it('set loading if seraching colors', () => {
      const enzymeWrapper = shallow(<App messages={{messages:messages, adding:false, searching:false}} colors={{colors:colors, searching: true}} searchMessages={searchMessagesMock} searchColors={searchColorsMock} createMessage={createMessageMock} />);
      expect(enzymeWrapper.find(PageBanner).prop('isLoading')).toBe(true);
    });

    it('set loading if searching messages', () => {
      const enzymeWrapper = shallow(<App messages={{messages:messages, adding:false,searching:true}} colors={{colors:colors, searching: false}} searchMessages={searchMessagesMock} searchColors={searchColorsMock} createMessage={createMessageMock} />);
      expect(enzymeWrapper.find(PageBanner).prop('isLoading')).toBe(true);
    });

    it('set loading if adding messages', () => {
      const enzymeWrapper = shallow(<App messages={{messages:messages, adding:true,searching:false}} colors={{colors:colors, searching: false}} searchMessages={searchMessagesMock} searchColors={searchColorsMock} createMessage={createMessageMock} />);
      expect(enzymeWrapper.find(PageBanner).prop('isLoading')).toBe(true);
    });
  });
});