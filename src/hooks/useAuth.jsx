import { useState, useEffect } from 'react'
import { getUserInfo, userLogin } from '../services/services'
import { useNavigate } from 'react-router-dom'

export const useAuth = ()=>{
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    // const [error, setError]= useState(null)
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

   
    const checkAuth = async()=>{
        const token = localStorage.getItem('token');
        const userInfo = JSON.parse(localStorage.getItem('user'));
  
        if (token) {
          setIsAuth(true);
          setUser(userInfo);
          console.log('is Auth' , isAuth)
        } else {
          setIsAuth(false);
          setUser(null);
        }
        if (token)  {
            try {
              await getUserInfo(token);
            } catch (error) {
              console.error('Error fetching user info:', error);
            }
          };
      
    }

    const auth = async(authForm)=>{
        setIsLoading(true)
        const userData = await userLogin({email:authForm.email, password:authForm.password})
        if (userData){
            localStorage.setItem('token', userData.token)
            setToken(userData.token)
            
            // const userDetails = await getUserInfo(userData.token) 

            // console.log(' user details=', userDetails, 'token=', userData.token)
            // setUser(userDetails)
            setIsAuth(true)
            navigate('/articles')
            }
           setIsLoading(false)
    }
    return{
        auth, isAuth, user, isLoading, token , checkAuth  }
}
