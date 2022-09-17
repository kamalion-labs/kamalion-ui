import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FaBeer } from 'react-icons/fa';
import { Alert } from '.';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {}
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Text = Template.bind({});
Text.args = {
  type: 'success',
  children: <>Alert</>
};

export const HtmlContent = Template.bind({});
HtmlContent.args = {
  type: 'success',
  children: (
    <>
      <b>Alert</b> Content
    </>
  )
};
