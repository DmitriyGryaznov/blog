import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Select } from 'antd'
import { registerNewUser } from '../../services/services';
import classes from '../SignUpPage/SignUpPage.module.scss'

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = () => {
    const navigate = useNavigate();
    const [isSignedUp, setIsSignedUp] = useState(false);

    const [form] = Form.useForm();
    const onFinish = async(values) => {
    const user = {username: values.username, email: values.email, password: values.password}
    try{
    const response = await registerNewUser(user);
    console.log (response)
    if (response) {
      navigate('/articles');
      setIsSignedUp(true);
      localStorage.setItem('token', response.token)

    } 
  }catch{
    console.log('invalid username')
    setIsSignedUp(false);
  }
   
    
        console.log('Received values of form: ', values, user);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  
    return (
        <>
        <div className={classes['container']}>
        <h2 style={{fontWeight:'500px', fontSize:'20px', marginTop:'0px'}}>Create new account</h2>
        <Form

        {...formItemLayout}
        form={form}
        name='register'
        layout='vertical'
        labelCol={{
          span: 23,
    
        }}
        wrapperCol={{
          span: 23,
          height: 68
        }}
        onFinish={onFinish}

       
        scrollToFirstError
      >
        <Form.Item
          name='username'
          label='Username'
          tooltip='Some username'
                    rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input style={{ height: '56px', marginTop:'0px', borderRadius:'6px', backgroundColor: 'white'}}
        />
        </Form.Item>
        <Form.Item
          name='email'
          label='E-mail'
          message = ''
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input style={{ height: '56px', marginTop:'0px', borderRadius:'6px', backgroundColor: 'white'}}/>
        </Form.Item>
  
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password style={{ height: '56px', marginTop:'0px', borderRadius:'6px', backgroundColor: 'white'}}
                          />
        </Form.Item>
  
        <Form.Item
          name='confirm'
          label='Confirm Password'
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
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password style={{ height: '56px', marginTop:'0px', borderRadius:'6px', backgroundColor: 'white'}}/>
        </Form.Item>
 
  
        <Form.Item
          name='agreement'
          valuePropName='checked'
          labelCol={{
            span: 23
          }}
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
        >
          <Checkbox style={{marginLeft:'0px'}}>
            I have read the <a href=''>agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}
        wrapperCol={{
          offset: 0,
          span: 23,
        }}
        >
          <Button type='primary' block htmlType='submit' style={{height:'40px', borderRadius: '6px'}}>
            Register
         </Button>
        </Form.Item>
      </Form>
      </div>
      </>
    );
}
export default SignUp

