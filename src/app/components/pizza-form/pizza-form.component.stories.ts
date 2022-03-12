import {PizzaFormComponent} from "./pizza-form.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {action} from "@storybook/addon-actions";
import {PizzaModule} from "../pizza.module";

export default {
  title:'PizzaFormComponent',
  component: PizzaFormComponent,
  decorators: [
    moduleMetadata({
      imports: [PizzaModule]
    })
  ]
} as Meta <PizzaFormComponent>

const Template: Story = (args) => ({
  props: {
    ...args,
    addToppings: action('selectedToppings'),
    onCreate: action('create'),
    onUpdate: action('update'),
    onRemove: action('remove')
  },
  template: `
  <pizza-form
            [pizza]="pizza"
            [toppings]="nToppings"
            (addToppings)="addToppings($event)"
            (create)="onCreate($event)"
            (update)="onUpdate($event)"
            (remove)="onRemove($event)">
        <pizza-display
                [toppings]="toppings">
        </pizza-display>
  </pizza-form>
  `
})
export const Primary = Template.bind({});
Primary.args = {
  pizza:{
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
  nToppings:[
    {id:1, name:'anchovy', price:1},
    {id:2, name:'bacon', price:0.7},
    {id:3, name:'chili', price:1.1},
    {id:4, name:'basil', price:1},
    {id:5, name:'mozzarella', price:0.8}
  ],
  toppings:[
    {id:1, name:'anchovy', price:1},
    {id:2, name:'bacon', price:0.7},
    {id:3, name:'chili', price:1.1},
    {id:4, name:'basil', price:1},
    {id:5, name:'mozzarella', price:0.8}
  ]
}
