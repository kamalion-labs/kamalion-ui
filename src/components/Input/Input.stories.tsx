import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FaBeer } from 'react-icons/fa';
import { Input } from '.';

export default {
  title: 'Components/Input',
  component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {};
