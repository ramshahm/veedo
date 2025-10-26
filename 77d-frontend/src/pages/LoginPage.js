import React from 'react';

export default function LoginPage(){
  function login(e){
    e.preventDefault();
    localStorage.setItem('isAdmin','true');
    setTimeout(function(){ window.location.replace('/'); }, 150);
  }
  return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-[#0F172A] text-white' },
    React.createElement('form', { onSubmit: login, className: 'p-8 bg-[#071129] rounded-2xl shadow-lg w-96' },
      React.createElement('h2', { className: 'text-2xl mb-4' }, 'Admin Login'),
      React.createElement('input', { placeholder: 'email', className: 'w-full p-2 mb-2 rounded bg-[#0b1220]' }),
      React.createElement('input', { placeholder: 'password', type: 'password', className: 'w-full p-2 mb-4 rounded bg-[#0b1220]' }),
      React.createElement('button', { className: 'w-full py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold' }, 'Sign in')
    )
  );
}
