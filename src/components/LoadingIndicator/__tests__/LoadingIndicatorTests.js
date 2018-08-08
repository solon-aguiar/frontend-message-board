import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import LoadingIndicator from '../../LoadingIndicator';

Enzyme.configure({ adapter: new Adapter() });

describe('LoadingIndicator', () => {
  it('renders with subcomponents with default props', () => {
    const enzymeWrapper = shallow(<LoadingIndicator />);

    expect(enzymeWrapper.find('span').hasClass('internal-loading-indicator-center')).toBe(true);
    expect(enzymeWrapper.find('div').length).toBe(3);
    expect(enzymeWrapper.find('.blue-dot').length).toBe(3);
    expect(enzymeWrapper.find('.blue-dot').get(0).props.style).toEqual({animationDelay: '-320ms'});
    expect(enzymeWrapper.find('.blue-dot').get(1).props.style).toEqual({animationDelay: '-160ms'});
    expect(enzymeWrapper.find('.blue-dot').get(2).props.style).toBe(undefined);
  });

  it('renders with the specified cssClass and background', () => {
    const enzymeWrapper = shallow(<LoadingIndicator background cssClass={'companion-loading-indicator'} />);

    expect(enzymeWrapper.find('span').hasClass('companion-loading-indicator')).toBe(true);
    expect(enzymeWrapper.find('div').length).toBe(3);
    expect(enzymeWrapper.find('.blue-dot').length).toBe(3);
    expect(enzymeWrapper.find('.blue-dot').get(0).props.style).toEqual({animationDelay: '-320ms', background: "black"});
    expect(enzymeWrapper.find('.blue-dot').get(1).props.style).toEqual({animationDelay: '-160ms', background: "black"});
    expect(enzymeWrapper.find('.blue-dot').get(2).props.style).toEqual({background: "black"});
  });

});
