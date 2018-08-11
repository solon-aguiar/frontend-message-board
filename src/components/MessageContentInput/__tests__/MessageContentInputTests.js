import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import MessageContentInput from '../../MessageContentInput';
import LoadingIndicator from '../../LoadingIndicator';

Enzyme.configure({ adapter: new Adapter() });

describe('MessageContentInput', () => {
  const onChangeMock = jest.fn();
  const onBlurMock = jest.fn();

  afterEach(() => {
    onChangeMock.mockClear();
    onBlurMock.mockClear();
  });


  it('displays the proper label', () => {
    const labelText = 'cliniko is so cool!';
    const enzymeWrapper = shallow(<MessageContentInput label={labelText} content={'my content'} onChange={onChangeMock} onBlur={onBlurMock} />);

    expect(enzymeWrapper.find('label').text()).toEqual(labelText);
  });

  it('shows the specified value in the input', () => {
    const contentText = 'red guava has great engineers';
    const enzymeWrapper = shallow(<MessageContentInput label={'labelText'} content={contentText} onChange={onChangeMock} onBlur={onBlurMock} />);

    expect(enzymeWrapper.find('input').prop('value')).toEqual(contentText);
  });

  it('triggers the callback on change', () => {
    const newText = 'new text';
    const enzymeWrapper = shallow(<MessageContentInput label={'labelText'} content={'content'} onChange={onChangeMock} onBlur={onBlurMock} />);

    enzymeWrapper.find('input').prop('onChange')(newText);

    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0]).toEqual([newText]);
  });

  it('triggers the callback on blur', () => {
    const enzymeWrapper = shallow(<MessageContentInput label={'labelText'} content={'content'} onChange={onChangeMock} onBlur={onBlurMock} />);

    enzymeWrapper.find('input').prop('onBlur')({});
    expect(onBlurMock.mock.calls.length).toBe(1);
  });

  it('shows the loading indicator', () => {
    const enzymeWrapper = shallow(<MessageContentInput label={'labelText'} content={'content'} onChange={onChangeMock} onBlur={onBlurMock} showLoading />);

    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(true);
  });

  it('does not show the loading indicator by default', () => {
    const enzymeWrapper = shallow(<MessageContentInput label={'labelText'} content={'content'} onChange={onChangeMock} onBlur={onBlurMock} />);

    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(false);
  });

  it('shows the error message', () => {
    const errorMessage = 'my ugly error';

    const enzymeWrapper = shallow(<MessageContentInput label={'labelText'} content={'content'} onChange={onChangeMock} onBlur={onBlurMock} showError errorMessage={errorMessage} />);

    expect(enzymeWrapper.find('.error-message').exists()).toBe(true);
    expect(enzymeWrapper.find('.error-message').text()).toEqual(errorMessage);
  });

  it('does not show the error by default', () => {
    const enzymeWrapper = shallow(<MessageContentInput label={'labelText'} content={'content'} onChange={onChangeMock} onBlur={onBlurMock} />);

    expect(enzymeWrapper.find('.error-message').exists()).toBe(false);
  });
});