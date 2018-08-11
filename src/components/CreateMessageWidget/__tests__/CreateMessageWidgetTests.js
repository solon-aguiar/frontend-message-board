import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import CreateMessageWidget from '../../CreateMessageWidget';
import ClinikoButton from '../../ClinikoButton';
import MessageContentInput from '../../MessageContentInput';
import MessageColorInput from '../../MessageColorInput';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateMessageWidget', () => {
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
  const inputMessage = 'new message content';
  const selectedColor = 'rainbow';

  const addMessageResponse = () => Promise.resolve();
  const addMessageMock = jest.fn().mockImplementation(addMessageResponse);

  afterEach(() => {
    addMessageMock.mockClear();
  });

  it('shows the subcomponents', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);

    expect(enzymeWrapper.find(MessageContentInput).exists()).toBe(true);
    expect(enzymeWrapper.find(MessageColorInput).exists()).toBe(true);
    expect(enzymeWrapper.find(ClinikoButton).exists()).toBe(true);
  });

  it('shows the colors as options', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);

    expect(enzymeWrapper.find(MessageColorInput).prop('options')).toEqual(colors);
    expect(enzymeWrapper.find(MessageColorInput).prop('label')).toEqual('Color');
  });

  it('shows an empty message as message content', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);

    expect(enzymeWrapper.find(MessageContentInput).prop('content')).toEqual('');
    expect(enzymeWrapper.find(MessageContentInput).prop('label')).toEqual('Message');
  });

  it('disables the submit button on start', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);

    expect(enzymeWrapper.find(ClinikoButton).prop('disabled')).toEqual(true);
  });

  it('shows loading indicator when adding new messages', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} isAddingMessage={true} />);
    expect(enzymeWrapper.find(ClinikoButton).prop('showLoadingIndicator')).toEqual(true);

    const anotherEnzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} isAddingMessage={false} />);
    expect(anotherEnzymeWrapper.find(ClinikoButton).prop('showLoadingIndicator')).toEqual(false);
    expect(enzymeWrapper.find(MessageContentInput).prop('showLoading')).toEqual(false);
  });

  it('displays the current message content on the input', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);
    enzymeWrapper.setState({messageContent: inputMessage});

    expect(enzymeWrapper.find(MessageContentInput).prop('content')).toEqual(inputMessage);
  });

  it('records the message content on input', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} isAddingMessage={true} />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:inputMessage}});

    expect(enzymeWrapper.state('messageContent')).toEqual(inputMessage);
  });

  it('displays the correct default selected color', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);

    expect(enzymeWrapper.find(MessageColorInput).prop('defaultOption')).toEqual('Choose a color...');
  });

  it('selects the current message color on the options', () => {
    const selectedColor = 'rainbow';

    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);
    enzymeWrapper.setState({messageColor: selectedColor});

    expect(enzymeWrapper.find(MessageColorInput).prop('selected')).toEqual(selectedColor);
  });

  it('records the message color on user selection', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);
    enzymeWrapper.find(MessageColorInput).prop('onSelect')(selectedColor);

    expect(enzymeWrapper.state('messageColor')).toEqual(selectedColor);
  });

  it('shows error message for empty message content', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);
    expect(enzymeWrapper.find(MessageContentInput).prop('showError')).toEqual(false);

    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:" "}});
    enzymeWrapper.update();

    expect(enzymeWrapper.find(MessageContentInput).prop('showError')).toEqual(true);
    expect(enzymeWrapper.state('messageContent')).toEqual(" ");
  });

  it('clears error message on valid inputs', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);

    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:" "}});
    enzymeWrapper.update();
    expect(enzymeWrapper.find(MessageContentInput).prop('showError')).toEqual(true);
    
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:"a valid message now!"}});
    enzymeWrapper.update();
    expect(enzymeWrapper.find(MessageContentInput).prop('showError')).toEqual(false);
  });

  it('allows the submission when no color is chosen', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:"a valid message now!"}});

    expect(enzymeWrapper.instance().canSubmit()).toEqual(true);
  });

  it('allows submission for valid data', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:inputMessage}});
    enzymeWrapper.find(MessageColorInput).prop('onSelect')(selectedColor);

    expect(enzymeWrapper.instance().canSubmit()).toEqual(true);

    enzymeWrapper.update();
    expect(enzymeWrapper.find(ClinikoButton).prop('disabled')).toEqual(false);
  });

  it('triggers the callback on submission', async () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:inputMessage}});
    enzymeWrapper.find(MessageColorInput).prop('onSelect')(selectedColor);

    enzymeWrapper.find(ClinikoButton).prop('onClick')();
    expect(addMessageMock.mock.calls.length).toBe(1);
  });

  it('resets the inputs on submission', async () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);
    enzymeWrapper.find(MessageContentInput).prop('onChange')({target:{value:inputMessage}});
    enzymeWrapper.find(MessageColorInput).prop('onSelect')(selectedColor);

    enzymeWrapper.find(ClinikoButton).prop('onClick')();
    await addMessageResponse

    expect(enzymeWrapper.instance().canSubmit()).toEqual(false);
    expect(enzymeWrapper.state()).toEqual({messageContent: '', messageColor: '', hasMessageContentError: false});
    expect(enzymeWrapper.find(ClinikoButton).prop('disabled')).toEqual(true);
    expect(enzymeWrapper.find(MessageColorInput).prop('selected')).toEqual('');
    expect(enzymeWrapper.find(MessageContentInput).prop('content')).toEqual('');
  });

  it('shows error for empty content on blur', () => {
    const enzymeWrapper = shallow(<CreateMessageWidget colors={colors} addMessage={addMessageMock} />);
    expect(enzymeWrapper.find(MessageContentInput).prop('showError')).toEqual(false);

    enzymeWrapper.find(MessageContentInput).prop('onBlur')({});
    enzymeWrapper.update();

    expect(enzymeWrapper.find(MessageContentInput).prop('showError')).toEqual(true);
  });

});
