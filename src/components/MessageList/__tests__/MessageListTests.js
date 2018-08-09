import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import MessageList from '../../MessageList';

Enzyme.configure({ adapter: new Adapter() });

describe('MessageList', () => {
  const messages = [
    {
      id: 1,
      content: 'content1',
      color: 'value1'
    },
    {
      id: 2,
      content: 'content 2',
      color: 'value2'
    }
  ];

  it('handles empty lists', () => {
     const enzymeWrapper = shallow(<MessageList messages={[]} />);

     expect(enzymeWrapper.find('ul').exists()).toBe(true);
     expect(enzymeWrapper.find('li').exists()).toBe(false);
  });

  it('creates one <li> per message', () => {
     const enzymeWrapper = shallow(<MessageList messages={messages} />);

     expect(enzymeWrapper.find('ul').exists()).toBe(true);
     expect(enzymeWrapper.find('li').length).toBe(2);

     expect(enzymeWrapper.find('li').get(0).props.children).toEqual('content1');
     expect(enzymeWrapper.find('li').get(0).props.style).toEqual({background: 'value1'});

     expect(enzymeWrapper.find('li').get(1).props.children).toEqual('content 2');
     expect(enzymeWrapper.find('li').get(1).props.style).toEqual({background: 'value2'});
  })
});