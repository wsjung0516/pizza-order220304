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
            [_pizza]="pizza"
            [toppings]="nToppings"
            (selectedToppings)="addToppings($event)"
            (create)="onCreate($event)"
            (update)="onUpdate($event)"
            (remove)="onRemove($event)">
        <pizza-display
                [toppings]="pizza.toppings">
        </pizza-display>
  </pizza-form>
  `
})
export const Primary = Template.bind({});
Primary.args = {
  pizza:{
    id: 1,
    name: 'aaa pizza',
    price: '20000',
    toppings: [
      {id: 1, name: "anchovy", price: 0.8},
      {id: 2, name: "bacon", price: 1.1},
      {id: 1, name: "anchovy", price: 0.8},
      {id: 4, name: "chili", price: 0.9},
      {id: 7, name: "olive", price: 1},
      {id: 2, name: "bacon", price: 1.1},
      {id: 7, name: "olive", price: 1},
      {id: 6, name: "mushroom", price: 1},
      {id: 7, name: "olive", price: 1},
    ]
  },
  nToppings:[
    {
      "id": 1,
      "name": "anchovy",
      "price": 1.0
    },
    {
      "id": 2,
      "name": "bacon",
      "price": 0.8
    },
    {
      "id": 3,
      "name": "basil",
      "price": 1.2
    },
    {
      "id": 4,
      "name": "chili",
      "price": 0.9
    },
    {
      "id": 5,
      "name": "mozzarella",
      "price": 0.8
    },
    {
      "id": 6,
      "name": "mushroom",
      "price": 0.7
    },
    {
      "id": 7,
      "name": "olive",
      "price": 1.1
    },
    {
      "id": 8,
      "name": "onion",
      "price": 1.0
    },
    {
      "id": 9,
      "name": "pepper",
      "price": 0.9
    },
    {
      "id": 10,
      "name": "pepperoni",
      "price": 0.7
    },
    {
      "id": 11,
      "name": "sweetcorn",
      "price": 1.3
    },
    {
      "id": 12,
      "name": "tomato",
      "price": 1.2
    }
  ],
}
