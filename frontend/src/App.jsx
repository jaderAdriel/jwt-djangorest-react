import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext'; 

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';

import './App.scss'
import Header from './components/Header';

function App() {
  
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/login' element={ <LoginPage /> }></Route>

        <Route 
          path='/' 
          element={
            <PrivateRoute element={<HomePage/>}></PrivateRoute>
          }>
        </Route>

      </Routes>

    </AuthProvider>
  )
}

export default App
