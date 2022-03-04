import {PizzaDisplayComponent} from "./pizza-display.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";

export default {
  title:'PizzaDisplayComponent',
  component: PizzaDisplayComponent,
  decorators: [
    moduleMetadata ({
      imports:[]
    })
  ]
} as Meta;
export const Template: Story = (args) => ({
  props: args,
  template: `<pizza-display [toppings]="toppings"></pizza-display>`

})
const Primary = Template.bind({});
Primary.args = {
  toppings:[
    {id:1, name:'anchoby'},
    {id:2, name:'bacon'},
    {id:3, name:'chili'}
  ]
}
