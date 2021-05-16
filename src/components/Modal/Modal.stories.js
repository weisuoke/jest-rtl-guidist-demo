import React from 'react'
import Modal from './index'

export default {
  title: "Components/Modal",
  Component: Modal,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
};

const Template = (args) => (
  <Modal {...args} onClick={args.onClick} closeModal={args.closeModal}>
    {args.children}
  </Modal>
);

export const VisibleModal = Template.bind({});
VisibleModal.args = {
  title: 'Visible Modal',
  visible: true,
  children: (
    <>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </>
  )
};

export const VisibleFooterModal = Template.bind({});
VisibleFooterModal.args = {
  title: 'Visible Modal',
  visible: true,
  children: (
    <>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </>
  ),
  footer: (
    <>
      <p>Custom Footer</p>
    </>
  )
}