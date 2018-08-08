import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import ClinikoButton from '../../ClinikoButton';
import LoadingIndicator from '../../LoadingIndicator';

Enzyme.configure({ adapter: new Adapter() });

describe('ClinikoButton', () => {
  const onClick = jest.fn();
  const buttonText = "Post Message";

  it('renders disabled if specified', () => {
    const enzymeWrapper = shallow(<ClinikoButton disabled onClick={onClick} showLoadingIndicator text={buttonText} />);
    expect(enzymeWrapper.find('button').prop('disabled')).toBe(true);
    expect(enzymeWrapper.find('button').hasClass("message-content-submit message-submit-button")).toBe(true);

    const anotherEnzymeWrapper = shallow(<ClinikoButton disabled={false} onClick={onClick} showLoadingIndicator text={buttonText} />);
    expect(anotherEnzymeWrapper.find('button').prop('disabled')).toBe(false);
  });

  it('shows loading indicator if specified', () => {
    const enzymeWrapper = shallow(<ClinikoButton disabled onClick={onClick} showLoadingIndicator text={buttonText} />);
    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(true);
    expect(enzymeWrapper.find(LoadingIndicator).prop('cssClass')).toEqual("internal-loading-indicator-center");

    const anotherEnzymeWrapper = shallow(<ClinikoButton disabled onClick={onClick} showLoadingIndicator={false} text={buttonText} />);
    expect(anotherEnzymeWrapper.find(LoadingIndicator).exists()).toBe(false);
  });

  it('displays the text', () => {
    const enzymeWrapper = shallow(<ClinikoButton disabled onClick={onClick} showLoadingIndicator text={buttonText} />);
    expect(enzymeWrapper.find('span').text()).toEqual(buttonText);
  });

  it('triggers the callback onClick if enabled', () => {
    const enzymeWrapper = shallow(<ClinikoButton disabled onClick={onClick} showLoadingIndicator text={buttonText} />);

    enzymeWrapper.find('button').get(0).props.onClick();
    expect(onClick.mock.calls.length).toBe(1);
  });
});
