import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from '.';

export default {
  title: 'Components/Input',
  component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: (value) => {
    console.log({ value });
  }
};

export const Number = Template.bind({});
Number.args = {
  type: 'money',
  onChange: (value) => {
    console.log({ value });
  }
};
