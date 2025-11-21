import React, { useState } from "react";
import { connectionApi } from "../../services/apiconnector.js";
import { contact } from "../../services/apis.js";
import toast from "react-hot-toast";
import Footer from "../Common/Footer.jsx";
const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await connectionApi(
        contact.CREATE_CONTACT,
        "POST",
        {},
        {},
        form
      );

      console.log(res.data);
      
      if(res){
        toast.success("Sent successfully")
      }
      
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in <span className="text-yellow-400">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col gap-6">
            <div className="group">
              <label className="block text-gray-300 font-semibold mb-2 text-sm">
                Your Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className={`w-full bg-gray-900/50 border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all`}
                  value={form.name}
                  onChange={changeHandler}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="group">
              <label className="block text-gray-300 font-semibold mb-2 text-sm">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className={`w-full bg-gray-900/50 border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all`}
                  value={form.email}
                  onChange={changeHandler}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="group">
              <label className="block text-gray-300 font-semibold mb-2 text-sm">
                Your Message *
              </label>
              <div className="relative">
                <div className="absolute top-3 left-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  className={`w-full bg-gray-900/50 border ${
                    errors.message ? 'border-red-500' : 'border-gray-700'
                  } rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all resize-none`}
                  rows="6"
                  value={form.message}
                  onChange={changeHandler}
                />
              </div>
              {errors.message && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {errors.message}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                {form.message.length} characters
              </p>
            </div>

            <button
              onClick={submitHandler}
              disabled={loading}
              className="relative w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold py-4 rounded-xl hover:from-yellow-400 hover:to-yellow-300 transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              We typically respond within 24 hours. For urgent matters, please email us at{" "}
              <a href="mailto:support@example.com" className="text-yellow-400 hover:text-yellow-300 underline">
                support@example.com
              </a>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6 text-center hover:border-yellow-500/30 transition">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Email</h3>
            <p className="text-gray-400 text-sm">support@example.com</p>
          </div>

          <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6 text-center hover:border-yellow-500/30 transition">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Phone</h3>
            <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
          </div>

          <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6 text-center hover:border-yellow-500/30 transition">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Office</h3>
            <p className="text-gray-400 text-sm">San Francisco, CA</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactForm;