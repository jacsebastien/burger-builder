import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
    useDispatch: () => {},
    useSelector: () => ({ ingredients: { salad: 0 } })
}));

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder />);
    });

    it('Should render <BuildControls /> when recieving ingredients', () => {
        // wrapper.setProps({ ingredients: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
