import {PizzaItemComponent} from "./pizza-item.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {PizzaModule} from "../../pizza.module";

export default {
  title: 'PizzaItemComponent',
  components: PizzaItemComponent,
  decorators: [
    moduleMetadata({
      imports:[PizzaModule]
    })
  ]
} as Meta<PizzaItemComponent>

const Template: Story = (args) =>({
  props: {
    ...args
  },
  template: `
    <pizza-item [pizza]="pizza"></pizza-item>
  `
})
export const Primary = Template.bind({})
Primary.args = {
  pizza:{
    id: 1,
    name: 'aaa pizza',
    price: '7500',
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
}
