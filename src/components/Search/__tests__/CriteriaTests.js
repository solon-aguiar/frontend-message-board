import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import Criteria from '../../Search/Criteria';
import DropdownList from '../../DropdownList';
import LoadingIndicator from '../../LoadingIndicator';

Enzyme.configure({ adapter: new Adapter() });

describe('Criteria', () => {
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

    expect(enzymeWrapper.find(DropdownList).exists()).toBe(true);
    expect(enzymeWrapper.find('input').exists()).toBe(true);
    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(false);
  });

  it('adds a default all colors option', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);

    const optionsWithDefault = [{name: 'All colors', value: '', id:'fake-id'}].concat(colors);
    expect(enzymeWrapper.find(DropdownList).prop('options')).toEqual(optionsWithDefault);
  });

  it('shows LoadingIndicator if searching with text', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching />);
    enzymeWrapper.setState({searchQuery: "message"});

    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(true);
  });

  it('changes state on input changes', () => {
    const searchQuery = 'new message content';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);
    enzymeWrapper.find('input').prop('onChange')({target:{value:searchQuery}});

    expect(enzymeWrapper.state('searchQuery')).toEqual(searchQuery);
  });

  it('changes state on color changes', () => {
    const newColor = 'rainbow';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} />);
    enzymeWrapper.find(DropdownList).prop('onChange')(newColor);

    expect(enzymeWrapper.state('selectedColor')).toEqual(newColor);
  });

  it('triggers search on state changes', () => {
    const searchQuery = 'new message content';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching />);
    enzymeWrapper.setState({searchQuery: searchQuery});

    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual([searchQuery, ""]);
  });

  it('aborts existing request and triggers new request on search criteria change', () => {
    const searchQuery = 'new message content';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching abortExistingRequest={{abort: abortRequestMock}}/>);
    enzymeWrapper.setState({searchQuery: searchQuery});

    expect(abortRequestMock.mock.calls.length).toBe(1);
  });

  it('triggers search on new messages added', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching isAdding />);
    enzymeWrapper.setProps({isAdding: false});

    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual(["", ""]);
  });

  it('aborts existing request and triggers new request on new messages added', () => {
    const searchQuery = 'new message content';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching isAdding abortExistingRequest={{abort: abortRequestMock}}/>);
    enzymeWrapper.setProps({isAdding: false});

    expect(abortRequestMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual(["", ""]);
  });

  it('searches with color and content', () => {
    const searchQuery = 'new message content';
    const newColor = 'rainbow';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching />);
    enzymeWrapper.setState({searchQuery: searchQuery, selectedColor:newColor});

    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual([searchQuery, newColor]);
  });

  it('encodes the URI for the color', () => {
    const searchQuery = 'new message content';
    const colorSelected = '#2795D9';
    const encodedColor = '%232795D9';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChangeMock} isSearching />);
    enzymeWrapper.setState({searchQuery: searchQuery, selectedColor:colorSelected});

    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual([searchQuery, encodedColor]);
  });  
});