import React from 'react';

export const FacebookLoginButton = ({ handleFacebookLogin }) => {
  return (
    <button
      onClick={handleFacebookLogin}
      className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full h-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2"
        viewBox="0 0 48 48"
      >
        <path
          fill="#1877F2"
          d="M45,24c0-11.6-9.4-21-21-21S3,12.4,3,24c0,10.5,7.7,19.2,17.7,20.8v-14.7h-5.3v-6.1h5.3v-4.5c0-5.3,3.2-8.3,8-8.3c2.3,0,4.3,0.2,4.9,0.2v5.6h-3.3c-2.6,0-3.2,1.2-3.2,3v3.9h6.4l-0.8,6.1h-5.6v14.7C37.3,43.2,45,34.5,45,24z"
        />
        <path
          fill="#fff"
          d="M32.4,30.1l0.8-6.1h-6.4v-3.9c0-1.8,0.6-3,3.2-3h3.3v-5.6c-0.6-0.1-2.6-0.2-4.9-0.2c-4.9,0-8,3-8,8.3v4.5h-5.3v6.1h5.3v14.7c1,0.2,2.1,0.3,3.3,0.3s2.2-0.1,3.3-0.3V30.1H32.4z"
        />
      </svg>
      <span>Continue with Facebook</span>
    </button>
  );
};

export default FacebookLoginButton;
