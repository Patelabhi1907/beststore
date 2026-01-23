import { ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { isAuthenticated } = useSelector(state => state.user);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-wide text-gray-800">
              BestStore.
            </span>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex items-center gap-10 text-[15px] font-medium text-gray-700">
            <li><Link to="/" className="cursor-pointer hover:text-black">Home</Link></li>
            <li><Link to="/products" className="cursor-pointer hover:text-black">Product</Link></li>
            <li><Link to="/about" className="cursor-pointer hover:text-black">About</Link></li>
            <li><Link to="/contact" className="cursor-pointer hover:text-black">Contact</Link></li>
          </ul>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
            className="cursor-pointer text-gray-700"
          >
            <User size={20} />
          </button>
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart className="text-gray-700" size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}
