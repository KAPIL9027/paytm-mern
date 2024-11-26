import {useEffect,useState} from 'react'
import {UserBadge} from './UserBadge.jsx'
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputBox from './InputBox';
import Button from './Button.jsx';
import { REACT_APP_BACKEND_URL } from '../config.js';
const SendMoney = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const [amount,setAmount] = useState(0);
  const [message,setMessage] = useState("");
  const navigate = useNavigate();
  const friendName = searchParams.get('name');
  const friendUserId = searchParams.get('userId');
  useEffect(()=>{
    if(!localStorage.getItem('userToken')){
      navigate('/signin');
    }
  })
  const onChange = (e)=>{
    setAmount(parseInt(e.target.value))
  }
  const onInitiateTransfer = async ()=>{
    if(!amount || amount <= 0){
        setMessage("Invaild amount value!");
        return;
    }
    const options = {
      method: "POST",
      body: JSON.stringify({
        to: friendUserId,
        amount: amount
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
    }
    }
    const response = await fetch(`${REACT_APP_BACKEND_URL}/account/transfer`,options);
    const responseData = await response.json();
    
    setMessage(responseData.message)
    if(responseData.message.includes("successful")){
       setTimeout(()=>{
        navigate('/dashboard')
       },3000)
        
      
      
    }
  }
  useEffect(()=>{
    if(!localStorage.getItem('userToken')){
      navigate.push('/signin');
    }
  })
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-400">
      <div className="flex flex-col items-center p-3 bg-white rounded-lg gap-14 w-96">
        <h1 className="text-3xl font-bold">Send Money</h1>
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2">
            <UserBadge name={friendName}/>
            <h2>{friendName}</h2>
          </div>
          <p className="text-sm font-medium">Amount (in Rs)</p>
          <InputBox type="text" placeholder={"Enter amount"} onChange={onChange}/>
          <Button onClick={onInitiateTransfer}text={"Initiate Transfer"}/>
          <div className={message && message.includes("successful") ? 'text-green-700 text-center' : 'text-red-800 text-center'}>{message}</div>
        </div>
      </div>
    </div>
  )
}

export default SendMoney
