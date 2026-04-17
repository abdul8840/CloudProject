// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants.js';
import Button from '../components/common/Button.jsx';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-black">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to={ROUTES.HOME}>
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;