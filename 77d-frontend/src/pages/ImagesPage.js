import React from 'react';
import Sidebar from '../components/Sidebar.js';
import { sampleProducts, sampleProdImages } from '../data/data.js';
import { motion } from 'framer-motion';

export default function ImagesPage() {
  const [images, setImages] = React.useState(sampleProdImages);
  const [preview, setPreview] = React.useState(null);
  const [form, setForm] = React.useState({
    ImgType: 'Main',
    ProdID: '',
    ImageURL: '',
    IsPrimary: false
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(Object.assign({}, form, { [name]: type === 'checkbox' ? checked : value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setForm(Object.assign({}, form, { ImageURL: url }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.ProdID || !form.ImageURL) {
      alert('Please select a product and upload an image.');
      return;
    }

    const is360 = form.ImgType === '360°';
    const newImage = Object.assign({}, form, {
      ImgID: Math.floor(Math.random() * 100000),
      productid: parseInt(form.ProdID, 10),
      IsPrimary: is360 ? false : form.IsPrimary
    });

    setImages([newImage].concat(images).slice(0, 10));
    alert('? Image added successfully');
    setForm({ ImgType: 'Main', ProdID: '', ImageURL: '', IsPrimary: false });
    setPreview(null);
  }

  function handleDelete(index) {
    if (confirm('Are you sure you want to delete this image?')) {
      const updated = images.slice();
      updated.splice(index, 1);
      setImages(updated);
    }
  }

  function getProduct(prodID) {
    return sampleProducts.find(p => p.productid === parseInt(prodID, 10)) || {};
  }

  return React.createElement(
    'div',
    { className: 'flex min-h-screen bg-[#071029] text-white' },

    // Sidebar
    React.createElement(Sidebar),

    // Main Content
    React.createElement(
      'div',
      { className: 'flex-1 p-6 overflow-y-auto' },

      React.createElement('h1', { className: 'text-3xl mb-6 font-semibold text-yellow-400' },
        'Jewellery Images Management'
      ),

      // Upload Section
      React.createElement(
        motion.form,
        {
          onSubmit: handleSubmit,
          className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 border border-yellow-800 rounded-2xl p-4 bg-[#0F172A]',
          initial: { opacity: 0 },
          animate: { opacity: 1 }
        },

        // Product Dropdown
        React.createElement('div', { className: 'flex flex-col' },
          React.createElement('label', { className: 'text-sm opacity-70 mb-1' }, 'Select Product'),
          React.createElement('select', {
            name: 'ProdID',
            value: form.ProdID,
            onChange: handleChange,
            className: 'p-2 rounded bg-[#071029] border border-yellow-900 text-white'
          },
            React.createElement('option', { value: '' }, 'Select a product'),
            sampleProducts.map(function(p) {
              return React.createElement('option', { key: p.productid, value: p.productid },
                `${p.ProdName} (${p.ProdCode})`
              );
            })
          )
        ),

        // Image Type
        React.createElement('div', { className: 'flex flex-col' },
          React.createElement('label', { className: 'text-sm opacity-70 mb-1' }, 'Image Type'),
          React.createElement('select', {
            name: 'ImgType',
            value: form.ImgType,
            onChange: handleChange,
            className: 'p-2 rounded bg-[#071029] border border-yellow-900 text-white'
          },
            ['Main', '360°', 'Front', 'Side', 'Zoom'].map(function(opt) {
              return React.createElement('option', { key: opt, value: opt }, opt);
            })
          )
        ),

        // File Upload
        React.createElement('div', { className: 'flex flex-col' },
          React.createElement('label', { className: 'text-sm opacity-70 mb-1' }, 'Upload Image'),
          React.createElement('input', {
            type: 'file',
            accept: 'image/*',
            onChange: handleFileChange,
            className: 'p-2 bg-[#071029] border border-yellow-900 rounded'
          }),
          preview && React.createElement('img', {
            src: preview,
            alt: 'Preview',
            className: 'mt-2 rounded-xl border border-yellow-700 h-24 w-24 object-cover'
          })
        ),

        // Checkbox
        React.createElement('div', { className: 'flex items-center gap-2 col-span-full' },
          React.createElement('input', {
            type: 'checkbox',
            name: 'IsPrimary',
            checked: form.IsPrimary,
            onChange: handleChange,
            className: 'accent-yellow-500'
          }),
          React.createElement('label', { className: 'text-sm' }, 'Set as Primary Image')
        ),

        // Submit
        React.createElement('div', { className: 'col-span-full text-right' },
          React.createElement('button', {
            type: 'submit',
            className: 'px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded hover:shadow-lg'
          }, 'Add Image')
        )
      ),

      // Table Section
      React.createElement('div', { className: 'overflow-x-auto' },
        React.createElement('table', { className: 'min-w-full border border-yellow-900 text-sm' },
          React.createElement('thead', { className: 'bg-[#0F172A]' },
            React.createElement('tr', null,
              ['ImgID', 'ProdID', 'Product Name', 'Product Code', 'Image', 'ImgType', 'IsPrimary', 'Action'].map(function(h) {
                return React.createElement('th', {
                  key: h,
                  className: 'p-2 border-b border-yellow-900 text-left'
                }, h);
              })
            )
          ),
          React.createElement('tbody', null,
            images.map(function(img, i) {
              const prod = getProduct(img.ProdID);
              return React.createElement('tr', {
                key: i,
                className: 'hover:bg-[#112233]'
              },
                React.createElement('td', { className: 'p-2 border-b border-yellow-900' }, img.ImgID),
                React.createElement('td', { className: 'p-2 border-b border-yellow-900' }, img.ProdID),
                React.createElement('td', { className: 'p-2 border-b border-yellow-900' }, prod.ProdName || '-'),
                React.createElement('td', { className: 'p-2 border-b border-yellow-900' }, prod.ProdCode || '-'),
                React.createElement('td', { className: 'p-2 border-b border-yellow-900' },
                  React.createElement('img', {
                    src: img.ImageURL,
                    alt: prod.ProdName,
                    className: 'h-16 w-16 object-cover rounded'
                  })
                ),
                React.createElement('td', { className: 'p-2 border-b border-yellow-900' }, img.ImgType),
                React.createElement('td', { className: 'p-2 border-b border-yellow-900' },
                  img.ImgType === '360°' ? 'No' : (img.IsPrimary ? 'Yes' : 'No')
                ),
                React.createElement('td', { className: 'p-2 border-b border-yellow-900' },
                  React.createElement('button', {
                    className: 'px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500',
                    onClick: function() { handleDelete(i); }
                  }, 'Delete')
                )
              );
            })
          )
        )
      )
    )
  );
}
