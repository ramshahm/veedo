import React from 'react';
import Sidebar from '../components/Sidebar.js';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

export default function HelpPage() {
  return React.createElement(
    'div',
    { className: 'flex min-h-screen bg-[#071029] text-white' },

    // Sidebar
    React.createElement(Sidebar),

    // Main Content
    React.createElement(
      'div',
      { className: 'flex-1 p-6 overflow-y-auto' },
      React.createElement(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
        },
        React.createElement(
          'h1',
          { className: 'text-3xl mb-6 font-semibold text-yellow-400 flex items-center gap-2' },
          React.createElement(HelpCircle, { className: 'text-yellow-400' }),
          'Help & Support'
        ),

        // Help Cards Section
        React.createElement(
          'div',
          { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },

          // Products Help
          React.createElement(
            'div',
            { className: 'border border-yellow-800 rounded-2xl p-5 bg-[#0F172A]' },
            React.createElement('h2', { className: 'text-xl mb-2 text-yellow-400' }, '💍 Managing Products'),
            React.createElement(
              'ul',
              { className: 'list-disc pl-5 space-y-2 text-sm text-gray-300' },
              React.createElement('li', null, 'Add new products using the “Add Product” form.'),
              React.createElement('li', null, 'Update existing product details by clicking the “Edit” button.'),
              React.createElement('li', null, 'Remove products using the “Delete” option.'),
              React.createElement('li', null, 'Use the price steppers to adjust cost and discounts easily.'),
              React.createElement('li', null, 'All changes reflect instantly in your product grid.')
            )
          ),

          // Product Images Help
          React.createElement(
            'div',
            { className: 'border border-yellow-800 rounded-2xl p-5 bg-[#0F172A]' },
            React.createElement('h2', { className: 'text-xl mb-2 text-yellow-400' }, '🖼️ Managing Product Images / 360°'),
            React.createElement(
              'ul',
              { className: 'list-disc pl-5 space-y-2 text-sm text-gray-300' },
              React.createElement('li', null, 'Upload product images using the upload section at the top.'),
              React.createElement('li', null, 'Choose a product name from the dropdown before uploading.'),
              React.createElement('li', null, 'For 360° image types, the system automatically marks “IsPrimary” as No.'),
              React.createElement('li', null, 'You can delete any image instantly using the “Delete” button.'),
              React.createElement('li', null, 'Uploaded images are displayed in a responsive grid below.')
            )
          ),

          // About Section
          React.createElement(
            'div',
            { className: 'md:col-span-2 border border-yellow-800 rounded-2xl p-5 bg-[#0F172A]' },
            React.createElement('h2', { className: 'text-xl mb-2 text-yellow-400' }, '💎 About PatSoft Jewellery'),
            React.createElement(
              'p',
              { className: 'text-sm text-gray-300 leading-relaxed' },
              'PatSoft Jewellery is a luxury brand offering elegant jewellery designs crafted with precision and innovation. ',
              'This platform was developed by PatSoft to simplify the product management workflow, enabling administrators ',
              'to manage products, upload 360° visuals, and maintain digital catalogues seamlessly. ',
              'We focus on performance, visual excellence, and ease of use to give you a brilliant digital showroom experience.'
            ),
            React.createElement(
              'p',
              { className: 'text-sm mt-3 text-gray-400 italic' },
              'For further assistance, please contact ',
              React.createElement('a', {
                href: 'mailto:support@patsoftjewellery.com',
                className: 'text-yellow-400 underline hover:text-yellow-300'
              }, 'support@patsoftjewellery.com'),
              '.'
            )
          )
        )
      )
    )
  );
}
