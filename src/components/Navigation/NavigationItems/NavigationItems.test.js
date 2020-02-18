import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// Connect Jest to React
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    it('Should render 2 <NavigationItems /> elements if not authenticated', () => {
        // Tell jets to render only NavigationItems component
        const wrapper = shallow(<NavigationItems />);
        // Tell Jest that we want to check NavigationItem inside the wrapper.
        // We must have 2 NavigationItem inside NavigationItems component for this test
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});
