import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, updateUserImage, updateUserProfile } from '../features/userSlice';
import { User, Heart, Star, Settings, Bell, LogOut, Edit2 } from 'lucide-react';
import ProductCard from '../components/ProductCard'; // Import your card component
import { toast } from 'react-toastify';

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const { items: favoriteItems } = useSelector((state) => state.favorites); // Get favorite items from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user'); // State for tab switching
  const fileInputRef = useRef(null);

  // Initialize formData directly from user data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    pincode: user?.pincode || ''
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit file size to 500KB (LocalStorage is small!)
    if (file.size > 500000) {
      toast.error("Image is too large! Please choose an image under 500KB.");
      return;
    }

    // Convert Image to Base64 String
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      dispatch(updateUserImage(base64String)); // Dispatch to Redux
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    dispatch(updateUserProfile({
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      pincode: formData.pincode
    }));
  };

  if (!user) return <div className="p-10">Please login to view profile.</div>;

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-100 flex flex-col p-6">
        <h1 className="text-xl font-bold mb-10 px-4">User Profile</h1>

        <nav className="flex-1 space-y-2">
          <div onClick={() => setActiveTab('user')}>
            <SidebarItem icon={<User size={20}/>} label="User Info" active={activeTab === 'user'} />
          </div>
          <div onClick={() => setActiveTab('favorites')}>
            <SidebarItem icon={<Heart size={20}/>} label={`Favorites (${favoriteItems.length})`} active={activeTab === 'favorites'} />
          </div>
          <SidebarItem icon={<Star size={20}/>} label="Watchlist" />
          <SidebarItem icon={<Settings size={20}/>} label="Setting" />
          <SidebarItem icon={<Bell size={20}/>} label="Notifications" />
        </nav>

        <button
          onClick={handleLogout} // Dispatches logout and navigates to login
          className="flex items-center gap-3 text-red-500 font-medium px-4 py-3 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} /> Log out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 overflow-y-auto">
        {activeTab === 'user' ? (
          <div className="max-w-3xl ml-10">
            {/* Header/Avatar Section */}
            <div className="flex items-center gap-6 mb-12">
              
              {/* --- PROFILE IMAGE SECTION --- */}
              <div className="relative">
                <img 
                  // Use user.image if it exists, otherwise use a placeholder
                  src={user.image || "https://via.placeholder.com/150"} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-100 shadow-sm"
                />
                
                {/* Edit Button */}
                <button 
                  onClick={triggerFileInput} 
                  className="absolute bottom-0 right-0 bg-orange-500 p-1.5 rounded-full text-white border-2 border-white hover:bg-orange-600 transition-colors"
                >
                  <Edit2 size={12} />
                </button>

                {/* Hidden Input Field */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
              {/* ----------------------------- */}

              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>

            {/* Form Grid */}
            <div className="max-w-3xl ml-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-transparent focus:border-orange-300 rounded-lg px-4 py-3 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
                  <input 
                    type="text" 
                    value={formData.email} 
                    readOnly 
                    className="bg-gray-100 text-gray-500 cursor-not-allowed border border-transparent rounded-lg px-4 py-3 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-transparent focus:border-orange-300 rounded-lg px-4 py-3 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-transparent focus:border-orange-300 rounded-lg px-4 py-3 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Pincode</label>
                  <input 
                    type="text" 
                    name="pincode"
                    value={formData.pincode} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-transparent focus:border-orange-300 rounded-lg px-4 py-3 outline-none"
                  />
                </div>
              </div>
              
              <button 
                onClick={handleSaveChanges}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-orange-200 transition-all active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="ml-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h2>
            {favoriteItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                <Heart size={64} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">No favorites yet</p>
                <p className="text-sm">Go back to the shop and add some items!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-components for cleaner code
const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'text-gray-900 bg-gray-50 border-r-4 border-orange-500 rounded-r-none' : 'text-gray-400 hover:bg-gray-50'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);
