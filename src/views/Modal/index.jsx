import React from 'react';
import { Form, Input, Modal, Button } from 'antd';

const ModalDemo = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue({ user: 'antd' });
    }
  }, [visible]);

  function onClose() {
    console.log(`form.getFieldValue('user') => `, form.getFieldValue('user'));
    setVisible(false);
  }

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Show Dialog
      </Button>

      <Modal forceRender visible={visible} onOk={onClose} onCancel={onClose}>
        <Form form={form}>
          <Form.Item name="user">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalDemo;
