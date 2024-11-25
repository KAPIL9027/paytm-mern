import {useState,useEffect} from 'react'
import { UserBadge } from "./UserBadge"
import { REACT_APP_BACKEND_URL } from '../config'
import { TransferCard } from './TransferCard'
import { useNavigate } from 'react-router-dom'
import InputBox from './InputBox'

//debounce the search value
const useDebouncedValue = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const Dashboard = () => {
  
  const navigation = useNavigate()
  const [filter,setFilter] = useState("");
  const debouncedSearchTerm = useDebouncedValue(filter,1000);
  const isLoggedIn = localStorage.getItem('userToken');

  const [balance,setBalance] = useState()
  const [users,setUsers] = useState([])
  useEffect(()=>{
    if(!isLoggedIn){
      navigation('/signin')
    }
  },[isLoggedIn,navigation])
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
    const response = await fetch(`${REACT_APP_BACKEND_URL}/users/bulk?filter=${filter}`,options);
    const responseData = await response.json();
    setUsers(responseData.users);
  }
 
  useEffect(()=>{
    getBalance()
  },[])
  useEffect(()=>{
    getAllUsers()
  },[debouncedSearchTerm])

  

  return ( 
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold md:text-3xl">Payments App</h1>
        <div className="flex gap-2">
        <p className="text-sm font-normal md:text-xl">Hello, User</p>
        <UserBadge name={"User"}/>
        </div>
      </div>
      <div className="flex gap-2">
        <h2 className="font-bold">Your Balance</h2>
        <p>{balance}</p>
      </div>
      <div className="w-full">
        <h2 className="font-bold">Users</h2>
        <InputBox type="text" onChange={(e)=> setFilter(e.target.value)}placeholder="Search users..." className="w-full p-2 border"/>
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
