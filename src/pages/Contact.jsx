import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="mx-auto max-w-xl">
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Contact Us Form</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">Message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition-colors"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Get In Touch</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-3 rounded-full mb-3">
                  <MapPin className="text-orange-500" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Address</h3>
                <p className="text-gray-600 text-sm">123 Store Street, Shopping District<br />New York, NY 10001</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-3 rounded-full mb-3">
                  <Phone className="text-orange-500" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                <p className="text-gray-600 text-sm">+1 (555) 987-6543</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-3 rounded-full mb-3">
                  <Mail className="text-orange-500" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600 text-sm">support@beststore.com</p>
                <p className="text-gray-600 text-sm">info@beststore.com</p>
              </div>
            </div>
          </div>

        
      </div>
    </div>
  );
}
