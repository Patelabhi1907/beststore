import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../features/userSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaApple, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { AppleIcon } from 'lucide-react';

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

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!terms) {
      toast.error('Please agree to the terms');
      return;
    }
    if (name && email && password) {
      const resultAction = await dispatch(register({ name, email: email.toLowerCase(), password }));

      if (resultAction && resultAction.type === 'user/registerSuccess') {
        navigate('/profile');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-none sm:shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
          <p className="text-sm text-gray-500 mt-1">Get deals, track orders & save items</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField label="Full Name" type="text" placeholder="Full Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <InputField label="Email" type="email" placeholder="Email Address" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Password" type="password" placeholder="Input Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputField label="Confirm Password" type="password" placeholder="Confirm Password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <div className="flex items-center mb-6">
            <input id="terms" type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-500">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 active:scale-95">
            Create Account
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500 font-medium">Or Sign up with</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <button className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"><FaApple /></button>
          <button className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"><FcGoogle /></button>
          <button className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"><FaFacebookF className="text-blue-600"  /></button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
