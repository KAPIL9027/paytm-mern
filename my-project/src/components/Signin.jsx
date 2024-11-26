import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { REACT_APP_BACKEND_URL } from '../config';
import Header from './Header.jsx';
import InputBox from './InputBox.jsx';
import Button from './Button.jsx';
import RedirectionText from './RedirectionText.jsx';

const Signin = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate  = useNavigate();

  useEffect(()=>{
    console.log('useEffect called');
    if(localStorage.getItem('userToken')) {
      navigate('/dashboard')
    }
  })
  
  const onSignin = async ()=>{
    if(!email || !password){
      setError("Invalid input credentials!");
      return
    }
    const options = {
      method: "POST",
      body: JSON.stringify({
        username:email,
        password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL}/users/signin`,options);
    const responseData = await response.json();
    if(!responseData){
      setError("Oops something went wrong!")
      return;
    }
    if(!responseData.token){
      setError(responseData.message);
      return
    }
    else{
      setError("")
      localStorage.setItem("userToken",responseData.token);
      navigate('/dashboard')
    }
    
    
  }
  return <div className="flex items-center justify-center w-screen h-screen bg-slate-400">
    <div className="flex flex-col w-full h-full gap-16 p-3 bg-white md:gap-4 md:w-96 md:rounded-sm md:h-fit">
      <Header title="Sign in" text="Enter your credentials to access your account"/>
      <div className="flex flex-col gap-2">
      <InputBox type={"email"} onChange={(e)=>{setEmail(e.target.value)}} label={"Email"} placeholder={"Email"}/>
      <InputBox type={"password"} onChange={(e)=>{setPassword(e.target.value)}} label={"Password"} placeholder={"Password"}/>
      </div>
      <div className="flex flex-col gap-2">
      <Button onClick={onSignin} text="Sign in"/>
      <RedirectionText mainText={"Don't have an account?"} text={"Sign Up"} to={"/signup"}/>
      </div>
      <div className="text-center text-red-600">{error}</div>
    </div>
  </div>;
}

export default Signin
