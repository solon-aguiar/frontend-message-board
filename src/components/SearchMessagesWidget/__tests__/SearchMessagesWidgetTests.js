import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import SearchMessagesWidget from '../../SearchMessagesWidget';
import MessageContentInput from '../../MessageContentInput';
import MessageColorInput from '../../MessageColorInput';
import MessageList from '../../MessageList';
import LoadingIndicator from '../../LoadingIndicator';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchMessagesWidget', () => {
  const searchQuery = 'new message content';
  const searchColor = 'rainbow';

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
  const abortRequestMock = jest.fn();

  afterEach(() => {
    searchMessagesMock.mockReset();
    abortRequestMock.mockReset();
  });

  it('renders with subcomponents', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} />);

    expect(enzymeWrapper.find(MessageContentInput).exists()).toBe(true);
    expect(enzymeWrapper.find(MessageColorInput).exists()).toBe(true);
    expect(enzymeWrapper.find(MessageList).exists()).toBe(true);
    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(false);
  });

  it('shows header loading indicator when search request is happening', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching />);

    expect(enzymeWrapper.find('InfoPanel').prop('isLoading')).toBe(true);
  });

  it('displays the number of messages loaded', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} messages={messages} />);

    expect(enzymeWrapper.find('InfoPanel').prop('nMessages')).toEqual(2);
  });

  it('shows the colors as options', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} />);

    expect(enzymeWrapper.find(MessageColorInput).prop('options')).toEqual(colors);
    expect(enzymeWrapper.find(MessageColorInput).prop('label')).toEqual('Filter');
  });

  it('displays the correct default selected color', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} />);

    expect(enzymeWrapper.find(MessageColorInput).prop('defaultOption')).toEqual('All colors');
  });

  it('displays the color options with proper styles', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} />);

    expect(enzymeWrapper.find(MessageColorInput).prop('style')).toEqual('search-color');
  });

  it('shows an empty message as message content', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} />);

    expect(enzymeWrapper.find(MessageContentInput).prop('content')).toEqual('');
    expect(enzymeWrapper.find(MessageContentInput).prop('label')).toEqual('Search');
  });

  it('shows loading indicator if searching with text', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:searchQuery}});
    enzymeWrapper.update();

    expect(enzymeWrapper.find(MessageContentInput).prop('showLoading')).toBe(true);
  });

  it('does not show loading indicator if searching only with colors', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching />);
    enzymeWrapper.find(MessageColorInput).prop('onSelect')(searchColor);
    enzymeWrapper.update();

    expect(enzymeWrapper.find(MessageContentInput).prop('showLoading')).toBe(false);
  });

  it('does not show loading indicator for empty search query', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:''}});
    enzymeWrapper.update();

    expect(enzymeWrapper.find(MessageContentInput).prop('showLoading')).toBe(false);
  });

  it('does not show loading indicator for any search operation', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching />);

    expect(enzymeWrapper.find(MessageContentInput).prop('showLoading')).toBe(false);
  });

  it('shows loading indicator if searching with text and with colors', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:searchQuery}});
    enzymeWrapper.update();

    expect(enzymeWrapper.find(MessageContentInput).prop('showLoading')).toBe(true);

    enzymeWrapper.setProps({isSearching:false});

    expect(enzymeWrapper.find(MessageContentInput).prop('showLoading')).toBe(false);

    enzymeWrapper.find(MessageColorInput).prop('onSelect')(searchColor);
    enzymeWrapper.setProps({isSearching:true});

    expect(enzymeWrapper.find(MessageContentInput).prop('showLoading')).toBe(true);
  });

  it('records the search query on input', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:searchQuery}});

    expect(enzymeWrapper.state('searchQuery')).toEqual(searchQuery);
  });

  it('displays the current message content on the input', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} />);
    enzymeWrapper.setState({searchQuery});

    expect(enzymeWrapper.find(MessageContentInput).prop('content')).toEqual(searchQuery);
  });

  it('records the color on selection', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} />);
    enzymeWrapper.find(MessageColorInput).prop('onSelect')(searchColor);

    expect(enzymeWrapper.state('selectedColor')).toEqual(searchColor);
  });

  it('displays the selected color on the options', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} />);
    enzymeWrapper.setState({selectedColor: searchColor});

    expect(enzymeWrapper.find(MessageColorInput).prop('selected')).toEqual(searchColor);
  });

  it('triggers new search on query', () => {
    const myQuery = 'abc';

    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching />);
    enzymeWrapper.setState({searchQuery: myQuery});

    expect(searchMessagesMock.mock.calls.length).toBe(1);
    expect(searchMessagesMock.mock.calls[0]).toEqual([myQuery, ""]);
  });

  it('triggers new search on color selection', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching />);
    enzymeWrapper.setState({selectedColor: searchColor});

    expect(searchMessagesMock.mock.calls.length).toBe(1);
    expect(searchMessagesMock.mock.calls[0]).toEqual(["", searchColor]);
  });

  it('aborts existing request and triggers new request on search criteria change', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching abortExistingRequest={{abort: abortRequestMock}}/>);
    enzymeWrapper.setState({searchQuery});

    expect(abortRequestMock.mock.calls.length).toBe(1);
  });

  it('triggers search on new messages added', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching isAdding />);
    enzymeWrapper.setProps({isAdding: false});

    expect(searchMessagesMock.mock.calls.length).toBe(1);
    expect(searchMessagesMock.mock.calls[0]).toEqual(["", ""]);
  });

  it('aborts existing request and triggers new request on new messages added', () => {
    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching isAdding abortExistingRequest={{abort: abortRequestMock}}/>);
    enzymeWrapper.setProps({isAdding: false});

    expect(abortRequestMock.mock.calls.length).toBe(1);
    expect(searchMessagesMock.mock.calls.length).toBe(1);
    expect(searchMessagesMock.mock.calls[0]).toEqual(["", ""]);
  });

  it('encodes the URI for the parameters', () => {
    const searchQuery = 'new message content';
    const encodedSearchQuery = 'new%20message%20content';

    const colorSelected = '#2795D9';
    const encodedColor = '%232795D9';

    const enzymeWrapper = shallow(<SearchMessagesWidget colors={colors} searchMessages={searchMessagesMock} isSearching />);
    enzymeWrapper.setState({searchQuery: searchQuery, selectedColor:colorSelected});

    expect(searchMessagesMock.mock.calls.length).toBe(1);
    expect(searchMessagesMock.mock.calls[0]).toEqual([encodedSearchQuery, encodedColor]);
  });  
});