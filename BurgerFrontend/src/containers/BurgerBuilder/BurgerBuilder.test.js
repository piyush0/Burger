import {BurgerBuilder} from "./BurgerBuilder";
import {configure, shallow} from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Burger from "../../components/Burger/Burger";

configure({adapter: new Adapter()});

describe("", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder fetchIngredients={() => {}}/>);
        console.log(wrapper)
    });

    it('should load BuildControl when ings are present', () => {
        wrapper.setProps({ingredients: {salad: 0}, prices: {salad: 3}});
        expect(wrapper.find(Burger)).toHaveLength(1);
    })
});