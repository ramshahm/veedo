import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Box, Image, HelpCircle, LogOut } from 'lucide-react';

export default function Sidebar() {
  const _a = React.useState(true), open = _a[0], setOpen = _a[1];
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path
      ? 'border-l-4 border-yellow-400 bg-[#131c33]'
      : '';
  }

  function handleLogout() {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  }

  return React.createElement(
    motion.aside,
    {
      initial: { width: open ? 220 : 64 },
      animate: { width: open ? 220 : 64 },
      className: 'bg-[#0F172A] text-white h-screen p-4 flex flex-col shadow-lg'
    },

    // Top section with logo and company name
    React.createElement(
      'div',
      { className: 'flex flex-col items-center justify-center mb-6' },
      React.createElement('img', {
        src: 'logo.jpeg',
        alt: 'logo',
        className: 'w-12 h-12 mb-2'
      }),
      open &&
        React.createElement(
          'h2',
          {
            className:
              'text-sm font-semibold text-yellow-400 text-center leading-tight mb-2'
          },
          'PatSoft Jewellery',
          React.createElement('br'),
          React.createElement('span', { className: 'text-[11px] text-gray-400' }, 'Admin')
        ),
      React.createElement(
        'button',
        {
          onClick: function () {
            setOpen(!open);
          },
          className:
            'text-yellow-400 font-bold self-end mt-2 hover:text-yellow-300'
        },
        open ? '«' : '»'
      )
    ),

    // Navigation menu
    React.createElement(
      'nav',
      { className: 'flex-1 mt-2' },
      React.createElement(
        'ul',
        null,
        React.createElement(
          'li',
          {
            className: `mb-2 flex items-center gap-3 p-2 rounded hover:shadow-lg hover:border-yellow-400 cursor-pointer ${isActive(
              '/'
            )}`,
            onClick: function () {
              navigate('/');
            }
          },
          React.createElement(Home),
          open && React.createElement('span', null, 'Home')
        ),
        React.createElement(
          'li',
          {
            className: `mb-2 flex items-center gap-3 p-2 rounded hover:shadow-lg hover:border-yellow-400 cursor-pointer ${isActive(
              '/products'
            )}`,
            onClick: function () {
              navigate('/products');
            }
          },
          React.createElement(Box),
          open && React.createElement('span', null, 'Products')
        ),
        React.createElement(
          'li',
          {
            className: `mb-2 flex items-center gap-3 p-2 rounded hover:shadow-lg hover:border-yellow-400 cursor-pointer ${isActive(
              '/images'
            )}`,
            onClick: function () {
              navigate('/images');
            }
          },
          React.createElement(Image),
          open && React.createElement('span', null, 'Product Images / 360°')
        ),
        React.createElement(
          'li',
          {
            className: `mb-2 flex items-center gap-3 p-2 rounded hover:shadow-lg hover:border-yellow-400 cursor-pointer ${isActive(
              '/help'
            )}`,
            onClick: function () {
              navigate('/help');
            }
          },
          React.createElement(HelpCircle),
          open && React.createElement('span', null, 'Help')
        )
      )
    ),

    // Logout section
    React.createElement(
      'div',
      { className: 'pt-4 border-t border-yellow-900 mt-4' },
      React.createElement(
        'button',
        {
          className:
            'w-full flex items-center gap-3 p-2 rounded hover:bg-[#112233] cursor-pointer',
          onClick: handleLogout
        },
        React.createElement(LogOut),
        open && React.createElement('span', null, 'Logout')
      )
    )
  );
}
