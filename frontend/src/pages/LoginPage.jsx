import React, { useContext} from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

import './LoginPage.scss';

function LoginPage() {
  const { loginUser } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    
    loginUser(username, password).then(
      (res) => {
        if (res) {
          alert(res);
        }
      }
    )
  }

  return (

    <div className='wrapper'>
        <main className='content'>

          <h1 className='title'>Log in</h1>

          <form className='form' onSubmit={handleLogin}>

            <div className="field">
              <input type="text" name="username" placeholder='username' id="username" />
            </div>

            <div className="field">
              <input type="password" name="password" placeholder='password' id="password" />
            </div>

              <input type="submit"/>
          </form>

        </main>
    </div>

  )
}

export default LoginPage