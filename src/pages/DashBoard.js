import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const navigate=useNavigate();

 useEffect(()=>{
if(!localStorage.getItem('token'))
{
  navigate('/pages/signin');
}
 },[])
  return (
    <div>DashBoard</div>
  )
}

export default DashBoard