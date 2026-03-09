import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import Login from './components/Login'
import ProductsPage from './pages/ProductsPage'
import AboutPage from './pages/AboutPage'
import Contact from './pages/Contact'
import Footer from './components/Footer'

const App = () => {
  const { user } = useSelector((state) => state.user);
  const { items: favorites } = useSelector((state) => state.favorites);
  const { items: cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user && user.email) {
      const favKey = `favorites_${user.email}`;
      const cartKey = `cart_${user.email}`;

      localStorage.setItem(favKey, JSON.stringify(favorites));
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [user, favorites, cartItems]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage/>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer /> {/* Add Footer Here */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  )
}

export default App
