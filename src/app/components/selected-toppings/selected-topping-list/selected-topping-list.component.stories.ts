import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {PizzaModule} from "../../pizza.module";
import {SelectedToppingListComponent} from "./selected-topping-list.component";

export default {
  title:'SelectedToppingListComponent',
  component: SelectedToppingListComponent,
  decorators: [
    moduleMetadata({
      imports: [PizzaModule]
    })
  ]
} as Meta<SelectedToppingListComponent>


const Template: Story = (args) => ({
  props: {
    ...args
  },
  template: `
    <div class="flex justify-items-start">
      <selected-topping-list
          [toppings]="toppings">
      </selected-topping-list>
    </div>
  `
})
export const Primary = Template.bind({});
Primary.args = {
  toppings:[
    {id:1, name:'anchovy', price:1},
    {id:2, name:'bacon', price:0.7},
    {id:3, name:'chili', price:1.1},
    {id:4, name:'basil', price:1},
    {id:5, name:'mozzarella', price:0.8},
    {id:1, name:'anchovy', price:1},
    {id:2, name:'bacon', price:0.7},
    {id:3, name:'chili', price:1.1},
    {id:4, name:'basil', price:1},
    {id:5, name:'mozzarella', price:0.8},
    {id:4, name:'basil', price:1},
    {id:5, name:'mozzarella', price:0.8}
  ]
}
