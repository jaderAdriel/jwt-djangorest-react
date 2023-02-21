import React,  { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function Header() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
        { user ? <p onClick={logoutUser}> Log out </p> : (
            <Link to={'/login'}> Log in</Link>
        )}
        <Link to={'/'}> Home </Link>
        <span>| </span>
        { user ? 'you are current authenticated as ' + user : '' }
    </div>
  )
}

export default Header