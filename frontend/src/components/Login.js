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
            const res=await axios.post('http://localhost:8000/api/auth/login',formData)
            console.log(res.data);
            localStorage.setItem('authToken',res.data);
            console.log("logged in");

            // fetchProfile();
            
            
        } catch (err) {
            console.error('error during login',err.response ? err.response.data : err.message)
        }
    
    }
    

  return (
    <div 
            className="min-h-screen  flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(background.jpg)` }}
        >
            <div>
                <img className='h-28 w-28 mb-10' src='logo.png'></img>
            </div>
            <div className="bg-purple-400 bg-opacity-30 p-8 rounded-lg shadow-lg  min-w-[400px]">
                <h1 className="text-3xl text-purple-400 font-bold mb-6 text-center">Login</h1>
                <form onSubmit={LoginUser} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={Change}
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={Change}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center flex justify-center gap-5 ">
                    <Link to="/register" className="text-purple-500 font-semibold hover:underline">
                        Register
                    </Link>                   
                    <br />
                    <Link to="/home" className="text-purple-500 font-semibold hover:underline">
                        Home
                    </Link>
                </div>
            </div>
        </div>
        
  )
}

export default Login
