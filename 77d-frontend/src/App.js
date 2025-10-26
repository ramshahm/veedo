import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.js';
import Dashboard from './pages/Dashboard.js';
import ProductsPage from './pages/ProductsPage.jsx';
import ImagesPage from './pages/ImagesPage.js';
import HelpPage from './pages/HelpPage.js';

function ProtectedRoute(props) {
  var children = props.children;
  var isAuth = localStorage.getItem('isAdmin') === 'true';
  return isAuth ? children : React.createElement(Navigate, { to: '/login', replace: true });
}

export default function App(){
  return React.createElement(BrowserRouter, null,
    React.createElement(Routes, null,
      React.createElement(Route, { path: '/login', element: React.createElement(LoginPage) }),
      React.createElement(Route, { path: '/', element:
        React.createElement(ProtectedRoute, null, React.createElement(Dashboard))
      }),
      React.createElement(Route, { path: '/products', element:
        React.createElement(ProtectedRoute, null, React.createElement(ProductsPage))
      }),
      React.createElement(Route, { path: '/images', element:
        React.createElement(ProtectedRoute, null, React.createElement(ImagesPage))
      }),
      React.createElement(Route, { path: '/help', element:
        React.createElement(ProtectedRoute, null, React.createElement(HelpPage))
      })
    )
  );
}
