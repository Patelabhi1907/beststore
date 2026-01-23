import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { FaEye, FaEyeSlash, FaApple, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";


const InputField = ({ label, type, placeholder, id, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-900 font-semibold mb-2 text-sm">{label}</label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none">
            {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const resultAction = await dispatch(login({
        email: email.toLowerCase().trim(),
        password: password.trim()
      }));

      // Check if the action type ends with 'loginSuccess'
      if (resultAction?.type === 'user/loginSuccess') {
        navigate('/profile');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-none sm:shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
          <p className="text-sm text-gray-500 mt-1">Login to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField label="Email" type="email" placeholder="Email Address" id="login_email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Password" type="password" placeholder="Password" id="login_password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="flex justify-end mb-6 -mt-2.5">
            <a href="#" className="text-sm text-blue-600 hover:underline font-medium">
              Forgot password? <span className="text-blue-600"></span>
            </a>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 active:scale-95">
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500 font-medium">Or Login with</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <button className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"><FaApple className="text-black" /></button>
          <button className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"><FcGoogle /></button>
          <button className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"><FaFacebookF className="text-blue-600" /></button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
