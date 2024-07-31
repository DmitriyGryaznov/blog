import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import SignIn from './pages/SignInPage/SignIn';
import SignUp  from './pages/SignUpPage/SignUp';
import Blog from './pages/MainPage/Mainpage'
import NotFound from './pages/NotFoundPage/Notfoundpage';
import SinglePage from './pages/SinglePage/SinglePage';
import Layout from './components/Layout/Layout';
import SignUpUser from './hoc/SignUpUser';
import Profile from './pages/ProfilePage/ProfilePage';
import NewArticle from './pages/NewArticlePage/NewArticlePage';
import EditArticle from './pages/EditArticlePage/EditArticlePage';


const App = () =>{
  
  return (
    <>
     <div className='App'>
      <Routes>
        <Route path = '/' element={<Layout/>}>
          <Route path = 'articles' element={<Blog/>}/>
          <Route path = '/' element={<Blog/>}/>
          <Route path = '/articles/:slug' element={<SinglePage/>}/>
          <Route path = 'signin' element={<SignIn/>}/>
          <Route path = 'signup' element={<SignUp/>}/>
          <Route path = 'signedup' element = {<SignUpUser><Blog/></SignUpUser>}/>
          <Route path = 'profile' element = {<Profile/>}/>
          <Route path = 'new-article' element = {<NewArticle/>}/>
          <Route path = 'articles/:slug/edit' element = {<EditArticle/>}/>
          <Route path = '*' element={<NotFound/>}/>  
        </Route>
      </Routes>
      
    </div>
    </>
    );
}

export default App;
