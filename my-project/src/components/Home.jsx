import {useEffect} from 'react'
import { useNavigate } from "react-router-dom"

export const Home = ()=>{
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('userToken'))
        navigate('/signin')
    
        navigate('/dashboard')
    })
    return (

        <div>

        </div>
    )
}