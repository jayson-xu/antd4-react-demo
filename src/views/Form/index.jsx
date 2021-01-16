import React from 'react';
import { Form, Button, Input, Modal } from 'antd';

const CustomField = ({ getFieldValue, ...props }) => {
  console.log(getFieldValue('field1'));
  return <input {...props} />;
};

const FormDemo = () => {
  const [form] = Form.useForm();
  setTimeout(() => {}, 1000);
  const onFinish = async values => {
    console.log('values', values);
    var value1 = form.getFieldValue('field1');
    var value2 = form.getFieldValue('field2');
    if (value1 && value2) {
      Modal.success({
        content: `${value1} ${value2}`,
      });
    } else {
      Modal.error({
        content: `${value1} ${value2}`,
      });
    }
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        field1: 'foo',
        field2: 'bar',
      }}
      style={{ width: '400px' }}
    >
      <Form.Item name="field1" label="Field 1">
        <input />
      </Form.Item>
      <Form.Item name="field2" label="Field 2">
        <CustomField getFieldValue={form.getFieldValue} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <div style={{textAlign: 'center'}}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          确定
        </Button>
      </div>
    </Form>
  );
};

export default FormDemo;
