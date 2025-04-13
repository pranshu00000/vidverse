'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  email: string;
  password: string;
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const router = useRouter();

  const Change = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const LoginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', formData);
      console.log(res.data);
      localStorage.setItem('authToken', res.data);
      console.log('logged in');
      router.push('/'); // Redirect after login
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // This ensures that the error is an Axios error
        console.error('Error during login:', err.response ? err.response.data : err.message);
      } else {
        console.error('Unexpected error:', err);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(/background.jpg)` }} // Next.js static image handling
    >
      <div>
        {/* <Image className="h-28 w-28 mb-10" src="/logo.png" alt="logo" /> Next.js static image */}
      </div>
      <div className="bg-purple-400 bg-opacity-30 p-8 rounded-lg shadow-lg min-w-[400px]">
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
        <div className="mt-6 text-center flex justify-center gap-5">
          <Link href="/register" className="text-purple-500 font-semibold hover:underline">
            Register
          </Link>
          <br />
          <Link href="/" className="text-purple-500 font-semibold hover:underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
