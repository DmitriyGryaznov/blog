import { Button, Flex, Input } from 'antd';
import { useEffect, useState } from 'react';
import { createArticle, getArticle, updateArticle } from '../../services/services';
import { useParams, useNavigate } from 'react-router-dom';
import classes from '../NewArticlePage/NewArticlePage.module.scss'
import { FormArticle } from '../../components/form/Form';

const EditArticle  = () => {
    const token = localStorage.getItem('token');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const { slug } = useParams(); // Get slug from URL
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const navigate = useNavigate()
    const [article, setArticle] = useState(null);
  
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

    useEffect(()=>{
        const getFormData = async()=>{
           const response = await getArticle(slug, token)
           setArticle(response.article)
           setTags(response.article.tagList)
        }
        getFormData()
        console.log(article)
    },[slug])  

    useEffect(()=>{
     
      console.log(article)
  },[article])  
    
    const onFinish = async(values) => {
      try {
        setIsLoading(true); // Set loading to true before making the API call
        values.tagList = tags; 
        console.log('New Article:', values, 'tags', tags);
        if(slug){
          console.log ('the slug is here')
          await updateArticle({}=values, slug, token)
          navigate('/')
        } 
      } catch (error) {
        console.error('Error creating/updating article:', error);
      } finally {
        setIsLoading(false); // Set loading to false after the API call is complete
      }
    }
  
    return (
      <><div className={classes['container']}>
        <h2>Edit article</h2>
         <FormArticle handleAddTag={handleAddTag} handleDeleteTag={handleDeleteTag} tagInput={tagInput} setTagInput={setTagInput} tags={tags} setTags={setTags} onFinish={onFinish} article={article} />
      </div></>
    );
  };
export default EditArticle