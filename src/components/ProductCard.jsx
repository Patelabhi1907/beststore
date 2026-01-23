import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import { addToCart } from '../features/cartSlice';
import { toggleFavorite } from '../features/favoritesSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get authentication state from userSlice
  const { isAuthenticated } = useSelector((state) => state.user);
  
  // Get favorites state
  const favorites = useSelector((state) => state.favorites?.items || []);
  const isFavorite = favorites.some((item) => item.id === product.id);

  // Requirement: Login before adding to cart
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.warn("Please login to add items to your cart!");
      navigate('/login');
      return;
    }
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  // Requirement: Login before adding to favorites
  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.warn("Please login to save favorites!");
      navigate('/login');
      return;
    }
    dispatch(toggleFavorite(product));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5">
      {/* Product Image */}
      <div className="flex justify-center items-center h-48 mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      {/* Product Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-1 truncate">
        {product.title}
      </h2>

      {/* Price */}
      <p className="text-lg text-gray-700 font-medium mb-2">
        ${product.price}
      </p>

      {/* Ratings and Wishlist Row */}
      <div className="flex items-center justify-between mb-5">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-orange-400"
          >
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
          <span className="font-bold text-gray-800 text-lg">{product.rating.rate}</span>
        </div>

        {/* Heart Icon Button - Fixed logic */}
        <button 
          onClick={handleToggleFavorite}
          className={`transition-colors p-1 rounded-full hover:bg-gray-50 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"} // Red fill if favorite
            stroke="currentColor"
            strokeWidth="2"
            className="w-7 h-7"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.691 2.25 5.357 4.811 3 7.875 3c1.25 0 2.5.584 3.415 1.655C12.086 3.584 13.336 3 14.586 3 17.649 3 20.25 5.357 20.25 8.691c0 3.483-2.438 6.669-4.74 8.816a25.18 25.18 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-[#fd9843] hover:bg-[#e8893b] text-white font-bold py-3 rounded-lg transition-colors shadow-sm text-lg"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
