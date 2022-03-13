import {MainPanelComponent} from "./main-panel.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {PizzaModule} from "../pizza.module";
import {PIZZA_CONFIG_TOKEN, SelectedItemService} from "../../services/selected-item.service";

export default {
  title:'MainPanelComponent',
  component: MainPanelComponent,
  decorators: [
    moduleMetadata({
      imports: [PizzaModule],
      providers: [
        {provide: PIZZA_CONFIG_TOKEN, useValue:''}
      ]
    })
  ]
} as Meta<MainPanelComponent>


const Template: Story = (args) => ({
  props: {
    ...args
  },
  template: `
    <main-panel>
    </main-panel>
  `
})
export const Primary = Template.bind({});
Primary.args = {
  pizza:{
    id: 1,
    name: 'aaa pizza',
    price: '6300',
    toppings: [
      {id: 1, name: "anchovy"},
      {id: 2, name: "bacon"},
      {id: 1, name: "anchovy"},
      {id: 4, name: "chili"},
      {id: 7, name: "olive"},
      {id: 2, name: "bacon"},
      {id: 7, name: "olive"},
      {id: 6, name: "mushroom"},
      {id: 7, name: "olive"},
    ]
  },
  toppings:[
    {id:1, name:'anchovy', price:1},
    {id:2, name:'bacon', price:0.7},
    {id:3, name:'chili', price:1.1},
    {id:4, name:'basil', price:1},
    {id:5, name:'mozzarella', price:0.8}
  ],
  nToppings:[
    {id:1, name:'anchovy', price:1},
    {id:2, name:'bacon', price:0.7},
    {id:3, name:'chili', price:1.1},
    {id:4, name:'basil', price:1},
    {id:5, name:'mozzarella', price:0.8}
  ],
  pizzas: [
    {
      id: 1,
      name: 'aaa pizza',
      toppings: [
        {id: 1, name: "anchovy"},
        {id: 2, name: "bacon"},
        {id: 1, name: "anchovy"},
        {id: 4, name: "chili"},
        {id: 7, name: "olive"},
        {id: 2, name: "bacon"},
        {id: 7, name: "olive"},
        {id: 6, name: "mushroom"},
        {id: 7, name: "olive"},
      ]
    },
    {
      id: 2,
      name: 'aaa pizza',
      toppings: [
        {id: 1, name: "anchovy"},
        {id: 2, name: "bacon"},
        {id: 1, name: "anchovy"},
        {id: 4, name: "chili"},
        {id: 7, name: "olive"},
        {id: 2, name: "bacon"},
        {id: 7, name: "olive"},
        {id: 6, name: "mushroom"},
        {id: 7, name: "olive"},
      ]
    },
    {
      id: 3,
      name: 'aaa pizza',
      toppings: [
        {id: 1, name: "anchovy"},
        {id: 2, name: "bacon"},
        {id: 1, name: "anchovy"},
        {id: 4, name: "chili"},
        {id: 7, name: "olive"},
        {id: 2, name: "bacon"},
        {id: 7, name: "olive"},
        {id: 6, name: "mushroom"},
        {id: 7, name: "olive"},
      ]
    },
    {
      id: 4,
      name: 'aaa pizza',
      toppings: [
        {id: 1, name: "anchovy"},
        {id: 2, name: "bacon"},
        {id: 1, name: "anchovy"},
        {id: 4, name: "chili"},
        {id: 7, name: "olive"},
        {id: 2, name: "bacon"},
        {id: 7, name: "olive"},
        {id: 6, name: "mushroom"},
        {id: 7, name: "olive"},
      ]
    },
    {
      id: 5,
      name: 'aaa pizza',
      toppings: [
        {id: 1, name: "anchovy"},
        {id: 2, name: "bacon"},
        {id: 1, name: "anchovy"},
        {id: 4, name: "chili"},
        {id: 7, name: "olive"},
        {id: 2, name: "bacon"},
        {id: 7, name: "olive"},
        {id: 6, name: "mushroom"},
        {id: 7, name: "olive"},
      ]
    }
  ]

};
