import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import Criteria from '../../Search/Criteria';
import MessageContentInput from '../../MessageContentInput';
import MessageColorInput from '../../MessageColorInput';

Enzyme.configure({ adapter: new Adapter() });

describe('Criteria', () => {
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
  const onChangeMock = jest.fn();
  const abortRequestMock = jest.fn();

  afterEach(() => {
    onChangeMock.mockReset();
    abortRequestMock.mockReset();
  });

  it('renders with subcomponents', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);

    expect(enzymeWrapper.find(MessageContentInput).exists()).toBe(true);
    expect(enzymeWrapper.find(MessageColorInput).exists()).toBe(true);
  });

  it('shows the colors as options', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);

    expect(enzymeWrapper.find(MessageColorInput).prop('options')).toEqual(colors);
    expect(enzymeWrapper.find(MessageColorInput).prop('label')).toEqual('Filter');
  });

  it('displays the correct default selected color', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);

    expect(enzymeWrapper.find(MessageColorInput).prop('defaultOption')).toEqual('All colors');
  });

  it('displays the color options with proper styles', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);

    expect(enzymeWrapper.find(MessageColorInput).prop('style')).toEqual('search-color');
  });

  it('shows an empty message as message content', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);

    expect(enzymeWrapper.find(MessageContentInput).prop('content')).toEqual('');
    expect(enzymeWrapper.find(MessageContentInput).prop('label')).toEqual('Search');
  });

  it('shows loading indicator if searching with text', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:searchQuery}});
    enzymeWrapper.update();

    expect(enzymeWrapper.find(MessageContentInput).prop('showLoading')).toBe(true);
  });

  it('does not show loading indicator if searching with colors', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching />);
    enzymeWrapper.find(MessageColorInput).prop('onSelect')(searchColor);
    enzymeWrapper.update();

    expect(enzymeWrapper.find(MessageContentInput).prop('showLoading')).toBe(false);
  });

  it('records the search query on input', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:searchQuery}});

    expect(enzymeWrapper.state('searchQuery')).toEqual(searchQuery);
  });

  it('displays the current message content on the input', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);
    enzymeWrapper.setState({searchQuery});

    expect(enzymeWrapper.find(MessageContentInput).prop('content')).toEqual(searchQuery);
  });

  it('records the color on selection', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);
    enzymeWrapper.find(MessageColorInput).prop('onSelect')(searchColor);

    expect(enzymeWrapper.state('selectedColor')).toEqual(searchColor);
  });

  it('displays the selected color on the options', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);
    enzymeWrapper.setState({selectedColor: searchColor});

    expect(enzymeWrapper.find(MessageColorInput).prop('selected')).toEqual(searchColor);
  });

  it('triggers new search on query', () => {
    const myQuery = 'abc';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching />);
    enzymeWrapper.setState({searchQuery: myQuery});

    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual([myQuery, ""]);
  });

  it('triggers new search on color selection', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching />);
    enzymeWrapper.setState({selectedColor: searchColor});

    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual(["", searchColor]);
  });

  it('aborts existing request and triggers new request on search criteria change', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching abortExistingRequest={{abort: abortRequestMock}}/>);
    enzymeWrapper.setState({searchQuery});

    expect(abortRequestMock.mock.calls.length).toBe(1);
  });

  it('triggers search on new messages added', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching isAdding />);
    enzymeWrapper.setProps({isAdding: false});

    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual(["", ""]);
  });

  it('aborts existing request and triggers new request on new messages added', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching isAdding abortExistingRequest={{abort: abortRequestMock}}/>);
    enzymeWrapper.setProps({isAdding: false});

    expect(abortRequestMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual(["", ""]);
  });

  it('encodes the URI for the parameters', () => {
    const searchQuery = 'new message content';
    const encodedSearchQuery = 'new%20message%20content';

    const colorSelected = '#2795D9';
    const encodedColor = '%232795D9';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching />);
    enzymeWrapper.setState({searchQuery: searchQuery, selectedColor:colorSelected});

    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual([encodedSearchQuery, encodedColor]);
  });  
});