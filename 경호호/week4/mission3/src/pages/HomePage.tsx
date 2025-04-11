import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Link to="/signup">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-150 ease-in-out">
          회원가입
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
