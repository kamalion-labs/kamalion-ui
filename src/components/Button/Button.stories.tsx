import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FaBeer } from 'react-icons/fa';
import { Button } from '.';

export default {
  title: 'Components/Button',
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Button</>
};

export const Icon = Template.bind({});
Icon.args = {
  children: <>Icon</>,
  icon: <FaBeer />
};

export const Loader = Template.bind({});
Loader.args = {
  children: <>Loader</>,
  usesLoader: true,
  onClick: async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
};

export const LoaderWithIcon = Template.bind({});
LoaderWithIcon.args = {
  children: <>Loader with icon</>,
  usesLoader: true,
  icon: <FaBeer />,
  onClick: async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
};

export const FullSize = Template.bind({});
FullSize.args = {
  className: 'w-full',
  children: <>Button</>
};

export const FullSizeWithIcon = Template.bind({});
FullSizeWithIcon.args = {
  className: 'w-full',
  children: <>Button</>,
  icon: <FaBeer />
};
