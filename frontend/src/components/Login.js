import React,{useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {
    const[formData,setFormData]=useState({
        email:'',
        password:''
    })
    const {email,password}=formData
    const Change=(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}
    const LoginUser=async e =>{
        // const fetchProfile=async()=>{
        //     const token=localStorage.getItem('authToken');
        //     if(!token) return console.error( 'no token found');
    
            // axios.get('http://localhost:5000/api/auth/profile',{
            //     headers:{Authorization:`Bearer ${token}`}
            // })
            // .then(response => {
            //     console.log('User profile:', response.data);})
    
            
        // }
        e.preventDefault();
        try {
            const res=await axios.post('/api/auth/login',formData)
            console.log(res.data);
            localStorage.setItem('authToken',res.data);
            console.log("logged in");

            // fetchProfile();
            
            
        } catch (err) {
            console.error('error during login',err.response ? err.response.data : err.message)
        }
    
    }
    

  return (
    <div style={{ backgroundColor: '#085f6f', height: '800px' }}>
            <form onSubmit={LoginUser}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={Change}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={Change}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Register</Link> <br />
            <Link to="img-upload">Upload</Link> <br />
            <Link to ="/home">home</Link>
        </div>
        
  )
}

export default Login
