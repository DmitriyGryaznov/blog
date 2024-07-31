import { updateUser } from '../../services/services';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputNumber } from 'antd';
import classes from '../ProfilePage/ProfilePage.module.scss'

const userfromLC = JSON.parse(localStorage.getItem('user'))
console.log (userfromLC)
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */
const token = localStorage.getItem('token')





const Profile  = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
    console.log(values, token);
    await updateUser({}=values.user, token)
    navigate ('/articles')
  } catch (error) {
    console.error('Error updating user:', error);
  };
  }

      return(
        <><div className={classes['container']}>
          <h2 className={classes['header']}>Edit profile</h2>

        <Form
        {...layout}
        // name='nest-messages'
        onFinish={onFinish}
        layout='vertical'
        labelCol={{
          span: 23,
    
        }}
        wrapperCol={{
          span: 23,
          height: 68
        }}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
        
      >
        <Form.Item
          // name={userfromLC.username}
          label='Name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input style={{ height: '56px', marginTop:'0px', borderRadius:'6px', backgroundColor: 'white'}}
                 value={userfromLC.username}
/>
        </Form.Item>
        <Form.Item
          // name={['user', 'username']}
          label='Email'
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input style={{ height: '56px', marginTop:'0px', borderRadius:'6px', backgroundColor: 'white'}}
                 value={userfromLC.email}/>
        </Form.Item>
        <Form.Item
      label='Password'
      name={['user', 'password']}
      rules={[
        {
          required: false,
        },
      ]}
    >
      <Input.Password style={{ height: '56px', marginTop:'0px', borderRadius:'6px', backgroundColor: 'white'}}/>
    </Form.Item >
        <Form.Item label='Image Url'>
          <Input style={{ height: '56px', marginTop:'0px', borderRadius:'6px', backgroundColor: 'white'}}
                 value={userfromLC.image}/>
        </Form.Item>
       
        <Form.Item
          wrapperCol={{
            span: 23,
            offset: 0,
          }}
        >
          <Button type='primary' block htmlType='submit' style={{height:'40px', borderRadius: '6px'}}>
            Save
          </Button>
        </Form.Item>
      </Form>
      </div></>
      )
}
export default Profile