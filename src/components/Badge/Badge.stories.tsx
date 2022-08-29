import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FaBeer } from 'react-icons/fa';
import { Badge } from '.';

export default {
  title: 'Components/Badge',
  component: Badge
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Text = Template.bind({});
Text.args = {
  type: 'success',
  children: <>Badge</>
};
