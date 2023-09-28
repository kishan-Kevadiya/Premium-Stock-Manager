'use client'
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Header from './compo/Header';
import ProductSearch from './compo/ProductSearch';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [message, setMessage] = useState('');

  useEffect(() => {
    toast('🦄 Welcome To Stock Management', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  const handleLogin = () => {
    // Replace 'user' and '123' with your desired username and password.
    const fixedUsername = 'maulikpatel1208';
    const fixedPassword = '2515';

    if (username === fixedUsername && password === fixedPassword) {
      setIsLoggedIn(true); // Set login status to true upon successful login
      setMessage('Login Successful!');
    } else {
      setMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
      {isLoggedIn ? (
        // Render the dashboard or another page when logged in
        <div className='h-100vh fixed top-0 left-0 right-0 bg-white'>
          <Header />
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-4">Search for a Product</h1>
            <ProductSearch />
          </div>
        </div>
      ) : (
        // Render the login form when not logged in
        <div className='flex item-center justify-center h-screen w-full bg-green-100'>
        <section className="container bg-white-200 flex item-center justify-center h-screen w-full">
          <div className="login-container bg-white-500 pt-40">
            <div className="circle circle-one"></div>
            <div className="form-container bg-opacity-70 backdrop-blur-lg border border-geay-100 rounded-md p-8 relative z-10">
              
              <img
                src="https://img.freepik.com/free-vector/computer-monitor-graphic-animator-creating-video-game-modeling-motion-processing-video-file-using-professional-editor-vector-illustration-graphic-design-art-designer-workplace-concept_74855-13038.jpg?size=626&ext=jpg"
                alt="illustration"
                className="illustration absolute top-[-14%] right-[-2px] w-[90%]"
              />
              <h1 className="opacity-60 text-2xl font-bold mb-6">LOGIN</h1>
              <form>
                <input
                  type="text"
                  placeholder="USERNAME"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full py-3 px-4 mb-6 rounded bg-opacity-70 backdrop-blur-md border border-gray-300 text-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full py-3 px-4 mb-6 rounded bg-opacity-70 backdrop-blur-md border border-gray-300 text-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={handleLogin}
                  className="block w-full py-3 px-4 mb-6 rounded bg-gray-200 text-gray-700 font-bold text-xl focus:outline-none focus:ring focus:ring-blue-300 hover:shadow-md transform hover:scale-102 transition duration-150"
                >
                  SUBMIT
                </button>
              </form>
             
              <p>{message}</p>
            </div>
            <div className="circle circle-two"></div>
          </div>
          <div className="theme-btn-container"></div>
        </section>
        </div>
      )}
    </>
  );
}

export default App;
