import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(
        () => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [user, setUser] = useState(
        () => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')).username : null
    );
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();
    
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null)
        localStorage.removeItem('authTokens');
        navigate('/login')
    }

    const loginUser = async function ( username, password ) {
        const response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json' 
            },
            body: JSON.stringify({'username': username, 'password': password})
        });

        const data = await response.json();
        
        if ( response.status !== 200){
            return data.detail;
        }

        setAuthTokens(data);
        setUser(jwt_decode(data.access).username);
        localStorage.setItem('authTokens', JSON.stringify(data));
        // navigate('/')
    }

    const updateTokens = async function () {
        console.log('fetching refresh token');
        const response = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json' 
            },
            body: JSON.stringify({'refresh' : authTokens.refresh })
        });

        const data = await response.json();

        if ( response.status !== 200){
            logoutUser();
        }

        setAuthTokens(data);
        setUser(jwt_decode(data.access).username);
        localStorage.setItem('authTokens', JSON.stringify(data));
    }

    const contextData = {
        loginUser: loginUser,
        user: user,
        logoutUser: logoutUser
    };

    useEffect(()=> {


        const intervalID = setInterval(()=> {
            if (authTokens) {
                updateTokens();
            }
        }, 1000 * 60 * 4 ) 
        // 4min
        
        return ()=> clearInterval(intervalID);

    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            { children }
        </AuthContext.Provider>
    )
}