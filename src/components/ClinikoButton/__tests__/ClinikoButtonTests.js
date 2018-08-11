import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import ClinikoButton from '../../ClinikoButton';
import LoadingIndicator from '../../LoadingIndicator';

Enzyme.configure({ adapter: new Adapter() });

describe('ClinikoButton', () => {
  const onClickMock = jest.fn();
  const buttonText = "Post Message";

  describe('when showing the loading indicator', () => {
    it('hides the text', () => {
      const enzymeWrapper = shallow(<ClinikoButton disabled onClick={onClickMock} showLoadingIndicator text={buttonText} />);
      expect(enzymeWrapper.find('span').prop('style')).toEqual({opacity: 0});
    });

    it('uses the LoadingIndicator', () => {
      const enzymeWrapper = shallow(<ClinikoButton disabled onClick={onClickMock} showLoadingIndicator text={buttonText} />);

      expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(true);
      expect(enzymeWrapper.find(LoadingIndicator).prop('cssClass')).toEqual("internal-loading-indicator-center");
    });
  });

  describe('when not showing the loading indicator', () => {
    it('does use the LoadingIndicator', () => {
      const enzymeWrapper = shallow(<ClinikoButton disabled onClick={onClickMock} text={buttonText} />);

      expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(false);
    });

    it('displays the text', () => {
      const enzymeWrapper = shallow(<ClinikoButton disabled onClick={onClickMock} text={buttonText} />);

      expect(enzymeWrapper.find('span').text()).toEqual(buttonText);
      expect(enzymeWrapper.find('span').prop('style')).toEqual({opacity: 10});
    });
  });

  describe('when disabled', () => {
    it('renders the disabled button', () => {
      const enzymeWrapper = shallow(<ClinikoButton disabled onClick={onClickMock} showLoadingIndicator text={buttonText} />);
      expect(enzymeWrapper.find('button').prop('disabled')).toBe(true);

      const anotherEnzymeWrapper = shallow(<ClinikoButton disabled={false} onClick={onClickMock} showLoadingIndicator text={buttonText} />);
      expect(anotherEnzymeWrapper.find('button').prop('disabled')).toBe(false);
    });
  });

  describe('when enable', () => {
    it('triggers the callback onClick if enabled', () => {
      const enzymeWrapper = shallow(<ClinikoButton disabled onClick={onClickMock} showLoadingIndicator text={buttonText} />);

      enzymeWrapper.find('button').prop('onClick')();
      expect(onClickMock.mock.calls.length).toBe(1);
    });
  });
});
