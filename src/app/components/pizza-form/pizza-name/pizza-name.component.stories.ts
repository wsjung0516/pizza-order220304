import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {PizzaNameComponent} from "./pizza-name.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {action} from "@storybook/addon-actions";

export default {
  title:'PizzaNameComponent',
  component: PizzaNameComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    })
  ]
} as Meta <PizzaNameComponent>

const Template: Story = (args) => ({
    component: PizzaNameComponent,
    template: `
    <pizza-name
        [price]="price"
        (isInvalid) = "onIsInvalid($event)"
        (name) = "onInputName($event)"
    ></pizza-name>
      `,
    props: {
      ...args,
      onIsInvalid: action('isInvalid'),
      onInputName: action('name')
    }
})
export const Primary = Template.bind({});
Primary.args = {
  price: '2,000 원'
}
