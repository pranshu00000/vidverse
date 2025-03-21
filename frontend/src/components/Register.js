import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/auth/register', formData);
            navigate('/')
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-slate-200"
            style={{ backgroundImage: `url(background.jpg)` }}
        >
            <div>
                <img className='h-28 w-28 mb-10' src='logo.png'></img>
            </div>
            <div className="bg-purple-400 bg-opacity-30 p-8 rounded-lg shadow-lg  min-w-[400px]">
                <h1 className="text-2xl text-white font-bold mb-6 text-center">Register</h1>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            placeholder="Username"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>    );
};

export default Register;
