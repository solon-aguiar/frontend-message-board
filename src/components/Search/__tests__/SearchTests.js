import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import Search from '../../Search';
import PaginatedMessageList from '../../PaginatedMessageList';
import Criteria from '../../Search/Criteria';
import LoadingIndicator from '../../LoadingIndicator';

Enzyme.configure({ adapter: new Adapter() });

describe('Search', () => {
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
  const onChange = jest.fn();

  it('renders the subcomponents', () => {
    const enzymeWrapper = shallow(<Search colors={colors} searchMessages={onChange} isSearching={false} messages={messages} />);

    expect(enzymeWrapper.find(Criteria).exists()).toBe(true);
    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(false);
    expect(enzymeWrapper.find(PaginatedMessageList).exists()).toBe(true);

    expect(enzymeWrapper.find(PaginatedMessageList).prop('messages')).toEqual(messages);
    expect(enzymeWrapper.find(Criteria).prop('colors')).toEqual(colors);
  });

  it('shows LoadingIndicator in case an operation is happening', () => {
    const enzymeWrapper = shallow(<Search colors={colors} searchMessages={onChange} isSearching messages={messages} />);

    expect(enzymeWrapper.find(Criteria).exists()).toBe(true);
    expect(enzymeWrapper.find(LoadingIndicator).exists()).toBe(true);
    expect(enzymeWrapper.find(PaginatedMessageList).exists()).toBe(true);
  });
});