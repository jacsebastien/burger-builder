import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// Connect Jest to React
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        // Tell jets to render only NavigationItems component
        wrapper = shallow(<NavigationItems />);
    });

    it('Should render 2 <NavigationItems /> elements if not authenticated', () => {
        // Tell Jest that we want to check NavigationItem inside the wrapper.
        // We must have 2 NavigationItem inside NavigationItems component for this test
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('Should render 3 <NavigationItems /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuth />);
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('Should render 3 <NavigationItems /> elements if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});
