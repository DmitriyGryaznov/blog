import { Button, Flex, Form, Input } from 'antd';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './Form.module.scss';

export const FormArticle = ({onFinish,tags,setTags,setTagInput,tagInput,handleDeleteTag,handleAddTag, article}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title: article?.title, description: article?.description, body: article?.body  });
  }, [article]);
    return (
        <Form
      form={form}
      scrollToFirstError
      layout='vertical'
      style={{ paddingBlock: 32 }}
      labelCol={{ span: 23 }}
      wrapperCol={{ span: 23 }}
      onFinish={onFinish}
    >
      <Form.Item
        name='title'
        label='Title'
        rules={[{ required: false }]}
        
      >
        <Input style={{height:'40px', borderRadius: '6px'}} 
        // eslint-disable-next-line no-unused-vars
               value={article?.title??''}
/>
      </Form.Item>

      <Form.Item
        name='description'
        label='Short description'
        rules={[{ required: false }]}
      >
        <Input style={{height:'40px', borderRadius: '6px'}}/>
      </Form.Item>

      <Form.Item
        name='body'
        label='Text'
        rules={[{ required: false }]}

      >
        <Input.TextArea rows={6} style={{borderRadius: '6px'}}
         />
      </Form.Item>

      <Form.Item label='Tags' className={classes['tags-wrapper']}>
          {tags.map((tag, index) => (
            
            <div className ={classes['tag-wrapper']}>
            <span key={index} className={classes['tags']} >
              {tag}
            </span>
            <Button 
             style={{
               cursor: 'pointer',
               marginLeft: 8,
               fontSize: 14,
               color: '#999',
             }}
             onClick={() => handleDeleteTag(index)}
           >
             Delete
            </Button>
            </div>
          ))}
            <div className ={classes['tag-wrapper']}>
            <Input
            placeholder='Add a tag'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            style={{height:'40px', maxWidth:'200px'}}
          />
          <Button onClick={handleAddTag}
                  style={{
                    cursor: 'pointer',
                    marginLeft: 8,
                    fontSize: 14,
                    color: '#999',
                  }}>Add</Button>
          </div>
          </Form.Item>
      <Form.Item
        wrapperCol={{ offset: 0,
                       span: 8
         }}
      >
        <Flex gap='small'>
          <Button type='primary' block htmlType='submit' style={{height: '40px'}} >
            Send
          </Button>
        </Flex>
      </Form.Item>
    </Form>
    )
}