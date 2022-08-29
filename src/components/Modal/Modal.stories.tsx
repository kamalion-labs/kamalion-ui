import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Modal } from '.';

export default {
  title: 'Components/Modal',
  component: Modal
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Text = Template.bind({});
Text.args = {
  children: <>Modal</>
};
