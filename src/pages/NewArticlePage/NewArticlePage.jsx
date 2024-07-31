import { Spin } from 'antd';
import { useState } from 'react';
import { createArticle, updateArticle } from '../../services/services';
import { useParams, useNavigate } from 'react-router-dom';
import classes from '../NewArticlePage/NewArticlePage.module.scss'
import { FormArticle } from '../../components/form/Form';


const NewArticle = () => {
  const token = localStorage.getItem('token');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const { slug } = useParams(); // Get slug from URL
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate()

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const onFinish = async(values) => {
    try {
      setIsLoading(true); // Set loading to true before making the API call
      values.tagList = tags; 
      console.log('New Article:', values, 'tags', tags);
        await createArticle({}=values, token);
        navigate('/')
      
    } catch (error) {
      console.error('Error creating/updating article:', error);
    } finally {
      setIsLoading(false); // Set loading to false after the API call is complete
    }
  }

  return (
    <><div className={classes['container']}>
      <h2>Create new article</h2>
      <Spin spinning={isLoading}>
       <FormArticle 
         handleAddTag={handleAddTag} 
         handleDeleteTag={handleDeleteTag} 
         tagInput={tagInput} 
         setTagInput={setTagInput} 
         tags={tags} 
         setTags={setTags} 
         onFinish={onFinish} />
      </Spin>   
    </div></>
  );
};

export default NewArticle;

