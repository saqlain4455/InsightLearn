import React from 'react';
import { Mail, Github, Linkedin, Twitter, Heart, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-slate-950 border-t border-slate-800 mt-6'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* About Section */}
          <div>
            <h3 className='text-yellow-400 font-bold text-xl mb-4'>Learn Code</h3>
            <p className='text-gray-400 text-sm leading-relaxed mb-4'>
              Empowering developers at every stage of their journey. From beginners to advanced programmers, we provide quality courses to help you succeed.
            </p>
            <div className='flex gap-3'>
              <a href='#' className='bg-slate-800 p-2 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:scale-110'>
                <Facebook className='w-4 h-4 text-white' />
              </a>
              <a href='#' className='bg-slate-800 p-2 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:scale-110'>
                <Instagram className='w-4 h-4 text-white' />
              </a>
              <a href='#' className='bg-slate-800 p-2 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:scale-110'>
                <Youtube className='w-4 h-4 text-white' />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className='text-yellow-400 font-bold text-xl mb-4'>Courses</h3>
            <ul className='space-y-2'>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Free Courses</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Beginner Path</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Intermediate Path</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Advanced Topics</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Certifications</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className='text-yellow-400 font-bold text-xl mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>About Us</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Our Team</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Careers</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Blog</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Contact</a></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className='text-yellow-400 font-bold text-xl mb-4'>Support</h3>
            <ul className='space-y-2 mb-6'>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Help Center</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>FAQs</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Community</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Privacy Policy</a></li>
              <li><a href='#' className='text-gray-400 hover:text-sky-500 transition-colors text-sm'>Terms of Service</a></li>
            </ul>
            <div className='flex gap-3'>
              <a href='#' className='bg-slate-800 p-2 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:scale-110'>
                <Github className='w-4 h-4 text-white' />
              </a>
              <a href='#' className='bg-slate-800 p-2 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:scale-110'>
                <Linkedin className='w-4 h-4 text-white' />
              </a>
              <a href='#' className='bg-slate-800 p-2 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:scale-110'>
                <Twitter className='w-4 h-4 text-white' />
              </a>
              <a href='#' className='bg-slate-800 p-2 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:scale-110'>
                <Mail className='w-4 h-4 text-white' />
              </a>
            </div>
          </div>
        </div>

        
        
          <p className='text-gray-500 text-sm'>
            © 2025 Learn Code. All rights reserved.
          </p>
        
        
      </div>
    </footer>
  );
};

export default Footer;