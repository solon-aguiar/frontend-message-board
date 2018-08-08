import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import LoadingIndicator from '../../LoadingIndicator';
import setUpJsDom from '../../__tests-setup__';

setUpJsDom();
Enzyme.configure({ adapter: new Adapter() });

describe('LoadingIndicator', () => {
  function setup(props) {
    const enzymeWrapper = mount(<LoadingIndicator />);

    return {
      props,
      enzymeWrapper
    };
  }

  it('should render self and subcomponents with default props', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('span').hasClass('internal-loading-indicator-center')).toBe(true);
    // expect(enzymeWrapper.find('span').hasClass('internal-loading-indicator-center')).toBe(true)

    // expect(enzymeWrapper.find('h1').text()).toBe('todos')

    // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
    // expect(todoInputProps.newTodo).toBe(true)
    // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
  });

});
