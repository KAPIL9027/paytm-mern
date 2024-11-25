import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from './Header.jsx'
import InputBox from "./InputBox.jsx";
import Button from './Button.jsx';
import RedirectionText from "./RedirectionText.jsx";
import { REACT_APP_BACKEND_URL } from "../config.js";


const Signup = () => {

  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate  = useNavigate();

  if(localStorage.getItem('userToken')) {
    navigate('/dashboard')
    return
  }
  const onSignup = async ()=>{
    if(!firstname || !lastname || !email || !password){
      setError("Invalid input credentials!");
      return
    }
    const options = {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        username:email,
        password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL}/users/signup`,options);
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
  return <div className="bg-slate-400 w-screen h-screen flex justify-center items-center">
    <div className="flex flex-col gap-16 md:gap-0 md:justify-between w-full h-full bg-white p-3 md:w-96 md:rounded-md md:h-fit">
      <Header title="Sign up" text="Enter your information to create an account"/>
      <div className="flex flex-col gap-2">
      <InputBox type={"text"} onChange={(e)=>{setFirstname(e.target.value)}} label={"First Name"} placeholder={"First Name"}/>
      <InputBox type={"text"} onChange={(e)=>{setLastname(e.target.value)}} label={"Last Name"} placeholder={"Last Name"}/>
      <InputBox type={"email"} onChange={(e)=>{setEmail(e.target.value)}} label={"Email"} placeholder={"Email"}/>
      <InputBox type={"password"} onChange={(e)=>{setPassword(e.target.value)}} label={"Password"} placeholder={"Password"}/>
      </div>
      <div className="flex flex-col gap-2">
      <Button onClick={onSignup} text="Sign up"/>
      <RedirectionText mainText={"Already have an account?"}text={"Login"} to={"/signin"}/>
      </div>
      <div className="text-red-600 text-center w-full">{error}</div>
    </div>
  </div>;
};

export default Signup;
