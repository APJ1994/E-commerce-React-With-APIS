import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const inputStyle = {
  marginBottom: '10px',
  padding: '5px',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const Signin = () => {
  const{isLoggedIn,setIsLoggedIn}=useAuth();

  const navigate=useNavigate();
  
const { register, handleSubmit,formState:{errors} } = useForm();

const handleRegistration=(async(values)=>{
  

const data={
  
    email:("email",values.email),
    password:("password",values.password)
  }
  try{
    const res=await axios.post('http://localhost/myecomm/LoginApi',data, 
    {
      headers:{
      "Content-type":"multipart/form-data",
    },
  }
  )
 const token=res.data.token;
 localStorage.setItem('token',token);
 setIsLoggedIn(true);
 navigate('/pages/dashboard')
  console.log(res.data); 
  }
  catch(err){
    console.error(err);
  }

})
return (
  <div style={{ maxWidth: '400px', margin: '0 auto' }}>
     <form onSubmit={handleSubmit(handleRegistration)}>
    <div>
      <label>Email</label>
      <input style={inputStyle} type="email" name="email" {...register('email',{required:'Email Address is Required'})} />
      {errors.email?.type==='required' && <p role='alert'>Email is Required</p>}
    </div>
    <div>
      <label>Password</label>
      <input style={inputStyle} type="password" name="password" {...register('password',{required:'Password is Required'})} />
      {errors.password?.type==='required' && <p role='alert'>Password is Required</p>}
    </div>
    <button style={buttonStyle}>Submit</button>
  </form>
    </div>
  )
}

export default Signin