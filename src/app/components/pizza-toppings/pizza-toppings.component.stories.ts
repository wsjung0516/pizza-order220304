import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {PizzaToppingsComponent} from "./pizza-toppings.component";
import {PizzaModule} from "../pizza.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {action, actions} from "@storybook/addon-actions";

export default {
  title:'PizzaToppings',
  component: PizzaToppingsComponent

} as Meta<PizzaToppingsComponent>
const Template: Story = (args) => ({
  props: {
    ...args,
    onSelect: action('selected')
  },
  decorators:[
    moduleMetadata({
      imports:[
        PizzaModule,
      ],
    })
  ],
  template: ` <pizza-toppings [toppings]="toppings"
                                (selected)="onSelect($event)"
                ></pizza-toppings>
  `
})
export const Primary = Template.bind({});
Primary.args = {
  toppings:[
    {id:1, name:'anchovy', price:1},
    {id:2, name:'bacon', price:0.7},
    {id:3, name:'chili', price:1.1},
    {id:4, name:'basil', price:1},
    {id:5, name:'mozzarella', price:0.8}
  ]
}
