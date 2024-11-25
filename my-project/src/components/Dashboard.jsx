import {useState,useEffect} from 'react'
import { UserBadge } from "./UserBadge"
import { REACT_APP_BACKEND_URL } from '../config'
import { TransferCard } from './TransferCard'
const Dashboard = () => {
  const [balance,setBalance] = useState()
  const [users,setUsers] = useState([])
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${localStorage.getItem("userToken")}`
  }
  }

  const getBalance = async ()=>{
    const response = await fetch(`${REACT_APP_BACKEND_URL}/account/balance`,options);
    const responseData = await response.json();
    setBalance(responseData.balance);
  }

  const getAllUsers = async ()=>{
    const response = await fetch(`${REACT_APP_BACKEND_URL}/users/bulk`,options);
    const responseData = await response.json();
    setUsers(responseData.users);
  }
  useEffect(()=>{
    getBalance()
    getAllUsers()
  },[])

  return ( 
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-2xl md:text-3xl">Payments App</h1>
        <div className="flex gap-2">
        <p className="font-normal text-sm md:text-xl">Hello, User</p>
        <UserBadge name={"User"}/>
        </div>
      </div>
      <div className="flex gap-2">
        <h2 className="font-bold">Your Balance</h2>
        <p>{balance}</p>
      </div>
      <div className="w-full">
        <h2 className="font-bold">Users</h2>
        <input type="text" placeholder="Search users..." className="w-full p-2 border"/>
        <div className="flex flex-col gap-2">
        {
          users?.map((user)=>{
            return <TransferCard key={user?._id} firstname={user?.firstname} lastname={user?.lastname} userId={user?._id}/>
          })
        }
        </div>
        
      </div>
      
    </div>
  )
}

export default Dashboard
