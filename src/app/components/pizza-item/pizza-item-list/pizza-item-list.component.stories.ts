import {PizzaItemListComponent} from "./pizza-item-list.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {PizzaModule} from "../../pizza.module";
import {action} from "@storybook/addon-actions";

export default {
  title: 'PizzaItemListComponent',
  component: PizzaItemListComponent,
  decorators: [
    moduleMetadata({
      imports: [PizzaModule]
    })
  ]
} as Meta<PizzaItemListComponent>

const Template: Story = (args) => ({
  props: {
    ...args,
    onSelected: action('selected')
  },
  template: `
    <pizza-item-list [pizzas]="pizzas"
        (selected)="onSelected($event)">
    </pizza-item-list>
  `
})
export const Primary = Template.bind({});
Primary.args = {
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
}
