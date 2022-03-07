import {ButtonsComponent} from "./buttons.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {action} from "@storybook/addon-actions";

export default {
  title: 'ButtonsComponent',
  component: ButtonsComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<ButtonsComponent>
const Template: Story = (args) => ({
  props: {
    ...args,
    onCreate: action('create'),
    onUpdate: action('update'),
    onRemove: action('remove')
  },
  template: `
    <app-buttons
        [exists]="exists"
        [form]="form"
        [pizza]="pizza"
        (create)="onCreate()"
        (update)="onUpdate()"
        (remove)="onRemove()"
    ></app-buttons>
  `
})
export const Primary = Template.bind({});
Primary.args = {
  exists: true,
  form: {
    valid: true,
    value: {
      name: 'aa'
    }
  },
  pizza: {

  }
}
