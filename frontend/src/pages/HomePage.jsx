import React from 'react'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


function HomePage() {
    const { user } = useContext(AuthContext);
    
    return (
        <div>
            You are authenticated as { user }
        </div>
    )
}



export default HomePage;