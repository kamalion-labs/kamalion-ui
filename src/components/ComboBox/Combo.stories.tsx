import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ComboBox } from '.';

export default {
  title: 'Components/ComboBox',
  component: ComboBox
} as ComponentMeta<typeof ComboBox>;

const Template: ComponentStory<typeof ComboBox> = (args) => <ComboBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: ['Value 1', 'Value 2'],
  onChange: (value: any) => {
    console.log({ value });
  }
};

export const WithObject = Template.bind({});
WithObject.args = {
  data: [
    { key: 1, value: 'Value 1' },
    { key: 2, value: 'Value 2' }
  ],
  memberName: 'value',
  memberValue: 'key',
  onChange: (value: string | number) => {
    console.log({ value });
  }
};
