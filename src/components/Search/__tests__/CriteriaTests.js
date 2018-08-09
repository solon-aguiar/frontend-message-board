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
  const onChange = jest.fn();

  afterEach(() => {
    onChange.mockReset();
  });

  it('renders with subcomponents', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChange} isSearching />);

    expect(enzymeWrapper.find(DropdownList).exists()).toBe(true);
    expect(enzymeWrapper.find('input').exists()).toBe(true);
    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(false);
  });

  it('adds a default empty option color', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChange} isSearching />);

    const optionsWithDefault = [{name: 'All colors', value: '', id:'fake-id'}].concat(colors);
    expect(enzymeWrapper.find(DropdownList).prop('options')).toEqual(optionsWithDefault);
  });

  it('shows LoadingIndicator if searching with content', () => {
    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChange} isSearching />);
    enzymeWrapper.setState({messageContent: "message"});

    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(true);
  });

  it('changes state on input changes', () => {
    const inputMessage = 'new message content';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChange} isSearching />);
    enzymeWrapper.find('input').prop('onChange')({target:{value:inputMessage}});

    expect(enzymeWrapper.state('messageContent')).toEqual(inputMessage);
  });

  it('changes state on color changes', () => {
    const newColor = 'rainbow';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChange} isSearching />);
    enzymeWrapper.find(DropdownList).prop('onChange')(newColor);

    expect(enzymeWrapper.state('selectedColor')).toEqual(newColor);
  });

  it('triggers search on state changes', () => {
    const inputMessage = 'new message content';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChange} isSearching />);
    enzymeWrapper.setState({messageContent: inputMessage});

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0]).toEqual([inputMessage, ""]);
  });

  it('triggers search on elements added', () => {
    const inputMessage = 'new message content';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChange} isSearching isAdding />);
    enzymeWrapper.setProps({isAdding: false});

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0]).toEqual(["", ""]);
  });

  it('searches with color and content', () => {
    const inputMessage = 'new message content';
    const newColor = 'rainbow';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChange} isSearching />);
    enzymeWrapper.setState({messageContent: inputMessage, selectedColor:newColor});

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0]).toEqual([inputMessage, newColor]);
  });

  it('encodes the URI for the color', () => {
    const inputMessage = 'new message content';
    const newColor = '#2795D9';
    const encodedColor = '%232795D9';

    const enzymeWrapper = shallow(<Criteria colors={colors} onChange={onChange} isSearching />);
    enzymeWrapper.setState({messageContent: inputMessage, selectedColor:newColor});

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0]).toEqual([inputMessage, encodedColor]);
  });  
});