import { Navigate } from 'react-router-dom';



const SignUpUser = ({children, isSignedUp})=>{
   
    if(isSignedUp === false){
        return <Navigate to='/signup' />
    }else{
    return children}
}

export default SignUpUser