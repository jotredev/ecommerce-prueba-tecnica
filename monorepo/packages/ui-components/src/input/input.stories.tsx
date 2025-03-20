import type {Meta, StoryObj} from "@storybook/react";
import {Input} from "./index";

const meta: Meta<typeof Input> = {
  title: "Componentes/ui/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: {type: "text"},
      defaultValue: ""
    }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {}
};
