import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import LoadingIndicator from '../../LoadingIndicator';
import PageBanner from '../../PageBanner';

Enzyme.configure({ adapter: new Adapter() });

describe('PageBanner', () => {
  it('renders with a loading indicator when loading', () => {
    const enzymeWrapper = shallow(<PageBanner isLoading />);

    expect(enzymeWrapper.find('header').hasClass('header')).toBe(true);
    expect(enzymeWrapper.find('h1').text()).toEqual("Message board");
    expect(enzymeWrapper.find(LoadingIndicator).length).toBe(1);
    expect(enzymeWrapper.find(LoadingIndicator).get(0).props).toEqual({background: true, cssClass: "companion-loading-indicator"});
  });

  it('renders without loading indicator when not loading', () => {
    const enzymeWrapper = shallow(<PageBanner isLoading={false} />);

    expect(enzymeWrapper.find('header').hasClass('header')).toBe(true);
    expect(enzymeWrapper.find('h1').text()).toBe("Message board");
    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(false);
  });
});
