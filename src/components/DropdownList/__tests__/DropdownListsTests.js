import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import DropdownList from '../../DropdownList';

Enzyme.configure({ adapter: new Adapter() });

describe('DropdownList', () => {
  const options = [
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

  const onChangeMock = jest.fn();

  it('renders each option with the specified one selected', () => {
    const enzymeWrapper = shallow(<DropdownList options={options} onChange={onChangeMock} selected={'value1'}/>);

    expect(enzymeWrapper.find('select').hasClass('dropdown')).toBe(true);
    expect(enzymeWrapper.find('select').get(0).props.value).toEqual('value1');

    expect(enzymeWrapper.find('option').length).toBe(2);
    expect(enzymeWrapper.find('option').get(0).props).toEqual({children: "Value 1", value: "value1"});
    expect(enzymeWrapper.find('option').get(1).props).toEqual({children: "Value 2", value: "value2"});
  });

  it('triggers the callback on the value selected', () => {
    const enzymeWrapper = shallow(<DropdownList options={options} onChange={onChangeMock} selected={'value1'}/>);

    enzymeWrapper.find('select').get(0).props.onChange({target:{value:'value2'}});
    expect(onChangeMock.mock.calls.length).toBe(1);
  });
});
