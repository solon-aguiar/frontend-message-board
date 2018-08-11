import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import MessageColorInput from '../../MessageColorInput';
import DropdownList from '../../DropdownList';

Enzyme.configure({ adapter: new Adapter() });

describe('MessageColorInput', () => {
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
  const onSelectMock = jest.fn();

  afterEach(() => {
    onSelectMock.mockClear();
  });

  it('adds a default empty color option', () => {
    const enzymeWrapper = shallow(<MessageColorInput options={colors} onSelect={onSelectMock} selected={'bla'} label={'my label'} defaultOption={'my default option'} />);

    const optionsWithDefault = [{name: 'my default option', value: '', id:'fake-id'}].concat(colors);
    expect(enzymeWrapper.find(DropdownList).prop('options')).toEqual(optionsWithDefault);
  });

  it('triggers callback on change', () => {
    const selectedColor = 'my color';

    const enzymeWrapper = shallow(<MessageColorInput options={colors} onSelect={onSelectMock} selected={'bla'} label={'my label'} defaultOption={'my default option'} />);
    enzymeWrapper.find(DropdownList).prop('onChange')(selectedColor);

    expect(onSelectMock.mock.calls.length).toBe(1);
    expect(onSelectMock.mock.calls[0]).toEqual([selectedColor]);
  });

  it('displays the specified label', () => {
    const enzymeWrapper = shallow(<MessageColorInput options={colors} onSelect={onSelectMock} selected={'bla'} label={'my label'} defaultOption={'my default option'} />);
    expect(enzymeWrapper.find('.search-label').text()).toEqual('my label');
  });

  it('uses the specified style', () => {
    const myCrazyStyle = 'myCrazyStyle-1234'
    const enzymeWrapper = shallow(<MessageColorInput options={colors} onSelect={onSelectMock} selected={'bla'} label={'my label'} defaultOption={'my default option'} style={myCrazyStyle} />);

    expect(enzymeWrapper.find(`.${myCrazyStyle}`).exists()).toBe(true);
  })
});



