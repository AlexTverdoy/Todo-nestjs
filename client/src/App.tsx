import React, { useLayoutEffect, useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import ApiProvider from './contexts/ApiProvider';
import LoginPage from './pages/LoginPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const loginHandler = () => {
    setIsAuthenticated(true);
  }

  const logoutHandler = () => {
    setIsAuthenticated(false);
  }

  useLayoutEffect(() => {
    const user = localStorage.getItem('a_t');
    if (user) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <div className='App'>
      <ApiProvider>
        {isAuthenticated
          ?
          <HomePage logoutHandler={logoutHandler}/>
          :
          <LoginPage loginHandler={loginHandler}/>
        }
      </ApiProvider>
    </div>
  );
}

export default App;
