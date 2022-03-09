import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {PizzaModule} from "../../pizza.module";
import {SelectedToppingItemComponent} from "./selected-topping-item.component";

export default {
  title:'SelectedToppingItemComponent',
  component: SelectedToppingItemComponent,
  decorators: [
    moduleMetadata({
      imports: [PizzaModule]
    })
  ]
} as Meta<SelectedToppingItemComponent>


const Template: Story = (args) => ({
  props: {
    ...args
  },
  template: `
    <div class="flex justify-items-start">
      <selected-topping-item
          [topping]="topping">
      </selected-topping-item>
    </div>
  `
})
export const Primary = Template.bind({});
Primary.args = {
  topping: {id: 1, name: "anchovy", count: 5}
}
