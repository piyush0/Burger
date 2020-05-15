import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from "./NavigationItems";
import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe('NavigationItems', () => {
    let wrapper;
    beforeEach(() => {
        wrapper  = shallow(<NavigationItems/>);
    });

    it('should load 2 NavigationItem if unauthenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should load 3 NavigationItem if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should load 3 NavigationItem if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link={"/logout"}>Logout</NavigationItem>)).toEqual(true);
    });
});