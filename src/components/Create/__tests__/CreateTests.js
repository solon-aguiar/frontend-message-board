import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import Create from '../../Create';
import DropdownList from '../../DropdownList';
import ClinikoButton from '../../ClinikoButton';

Enzyme.configure({ adapter: new Adapter() });

describe('Create', () => {
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
  const addMessageResponse = () => Promise.resolve();
  const addMessage = jest.fn().mockImplementation(addMessageResponse);

  afterEach(() => {
    addMessage.mockClear();
  });

  it('renders with subcomponents', () => {
    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={false} />);

    expect(enzymeWrapper.find(DropdownList).exists()).toBe(true);
    expect(enzymeWrapper.find(ClinikoButton).exists()).toBe(true);
    expect(enzymeWrapper.find('input').exists()).toBe(true);
  });

  it('adds a default empty option color', () => {
    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={false} />);

    const optionsWithDefault = [{name: 'Choose a color...', value: '', id:'fake-id'}].concat(colors);
    expect(enzymeWrapper.find(DropdownList).prop('options')).toEqual(optionsWithDefault);
  });

  it('disables the submit button on start', () => {
    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={true} />);

    expect(enzymeWrapper.find(ClinikoButton).prop('disabled')).toEqual(true);
  });

  it('renders button with loading indicator when adding new messages', () => {
    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={true} />);
    expect(enzymeWrapper.find(ClinikoButton).prop('showLoadingIndicator')).toEqual(true);

    const anotherEnzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={false} />);
    expect(anotherEnzymeWrapper.find(ClinikoButton).prop('showLoadingIndicator')).toEqual(false);
  });

  it('changes the message content on input', () => {
    const inputMessage = 'new message content';

    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={true} />);
    enzymeWrapper.find('input').prop('onChange')({target:{value:inputMessage}});

    expect(enzymeWrapper.state('messageContent')).toEqual(inputMessage);
  });

  it('changes the message color on input', () => {
    const newColor = 'rainbow';

    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={true} />);
    enzymeWrapper.find(DropdownList).prop('onChange')(newColor);

    expect(enzymeWrapper.state('messageColor')).toEqual(newColor);
  });

  it('shows error message for empty input content', () => {
    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={true} />);
    expect(enzymeWrapper.find('.error-message').exists()).toEqual(false);

    enzymeWrapper.find('input').prop('onChange')({target:{value:" "}});
    expect(enzymeWrapper.state('hasMessageContentError')).toEqual(true);
    expect(enzymeWrapper.state('messageContent')).toEqual(" ");

    enzymeWrapper.update();
    expect(enzymeWrapper.find('.error-message').exists()).toEqual(true);
  });

  it('clears error message on valid inputs', () => {
    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={true} />);
    enzymeWrapper.find('input').prop('onChange')({target:{value:" "}});

    enzymeWrapper.update();
    expect(enzymeWrapper.find('.error-message').exists()).toEqual(true);
    
    enzymeWrapper.find('input').prop('onChange')({target:{value:"a valid message now!"}});

    enzymeWrapper.update();
    expect(enzymeWrapper.find('.error-message').exists()).toEqual(false);
  });

  it('does not allow submission for no color', () => {
    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={true} />);
    enzymeWrapper.find('input').prop('onChange')({target:{value:"a valid message now!"}});

    expect(enzymeWrapper.instance().canSubmit()).toEqual(false);
  });

  it('allows submission for valid data', () => {
    const newColor = 'rainbow';
    const inputMessage = 'new message content';

    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={true} />);
    enzymeWrapper.find('input').prop('onChange')({target:{value:inputMessage}});
    enzymeWrapper.find(DropdownList).prop('onChange')(newColor);

    expect(enzymeWrapper.instance().canSubmit()).toEqual(true);

    enzymeWrapper.update();
    expect(enzymeWrapper.find(ClinikoButton).prop('disabled')).toEqual(false);
  });

  it('resets the form on submission', async () => {
    const newColor = 'rainbow';
    const inputMessage = 'new message content';

    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={true} />);
    enzymeWrapper.find('input').prop('onChange')({target:{value:inputMessage}});
    enzymeWrapper.find(DropdownList).prop('onChange')(newColor);

    enzymeWrapper.find(ClinikoButton).prop('onClick')();
    await addMessageResponse

    enzymeWrapper.update();
    expect(enzymeWrapper.instance().canSubmit()).toEqual(false);
    expect(enzymeWrapper.state()).toEqual({messageContent: '', messageColor: '', hasMessageContentError: false});
    expect(enzymeWrapper.find(ClinikoButton).prop('disabled')).toEqual(true);
    expect(enzymeWrapper.find(DropdownList).prop('selected')).toEqual('');
  });

  it('shows error for invalid message on blur of the input', () => {
    const enzymeWrapper = shallow(<Create colors={colors} addMessage={addMessage} isAddingMessage={true} />);
    expect(enzymeWrapper.find('.error-message').exists()).toEqual(false);

    enzymeWrapper.find('input').prop('onBlur')({});
    expect(enzymeWrapper.state('hasMessageContentError')).toEqual(true);

    enzymeWrapper.update();
    expect(enzymeWrapper.find('.error-message').exists()).toEqual(true);
  });

});
