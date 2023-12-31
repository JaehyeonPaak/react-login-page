import React from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';
import { useContext } from 'react';

function App() {
  const context = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader onLogout={context.logoutHandler} />
      <main>
        {!context.isLoggedIn && <Login/>}
        {context.isLoggedIn && <Home/>}
      </main>
    </React.Fragment>
  );
}

export default App;
