import React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {Button} from "./index";

const meta: Meta<typeof Button> = {
  title: "Componentes/ui/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["primary", "secondary", "outline"]
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"]
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button Default"
  }
};

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary"
  }
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary"
  }
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline"
  }
};

// Si quieres añadir una historia con render personalizado
export const WithIcon: Story = {
  render: (args) => <Button {...args}>📦 Con Ícono</Button>
};
