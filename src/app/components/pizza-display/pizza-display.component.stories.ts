import {PizzaDisplayComponent} from "./pizza-display.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {AppModule} from "../../app.module";
import {PizzaModule} from "../pizza.module";

export default {
  title:'PizzaDisplayComponent',
  component: PizzaDisplayComponent,
  decorators: [
    moduleMetadata ({
      declarations: [],
      imports:[PizzaModule]
    })
  ]
} as Meta<PizzaDisplayComponent>;
const Template: Story = (args) => ({
  props: {
    ...args
  },
  template: `<pizza-display [toppings]="toppings"></pizza-display>`

})
export const Primary = Template.bind({});
Primary.args = {
  toppings:[
    {id:1, name:'anchovy'},
    {id:2, name:'bacon'},
    {id:3, name:'chili'}
  ]
}
