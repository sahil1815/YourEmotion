import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className='bg-gray-700 text-white'>
      <div className='flex justify-between items-center py-4 px-4 md:px-10 h-16'>
        {/* Logo */}
        <Link to='/' className='font-bold text-xl md:text-2xl'>
          YourEmotion
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-5 items-center'>
          <Link 
            to='/' 
            className='bg-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-700 hover:scale-95 active:scale-100 transition-all duration-100 font-medium'
          >
            Search
          </Link>
          <Link 
            to='/collection' 
            className='bg-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-700 hover:scale-95 active:scale-100 transition-all duration-100 font-medium'
          >
            Collection
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className='md:hidden text-white focus:outline-none'
          aria-label='Toggle menu'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            {isMenuOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='md:hidden bg-gray-800 px-4 py-4 space-y-3'>
          <Link
            to='/'
            onClick={toggleMenu}
            className='block w-full text-center bg-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-700 active:scale-95 transition-all duration-100 font-medium'
          >
            Search
          </Link>
          <Link
            to='/collection'
            onClick={toggleMenu}
            className='block w-full text-center bg-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-700 active:scale-95 transition-all duration-100 font-medium'
          >
            Collection
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;