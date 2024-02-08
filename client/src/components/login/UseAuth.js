import { useNavigate } from 'react-router-dom';
//import Cookies from 'js-cookie';



export function UseAuth() {
  const navigate = useNavigate();

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    // Cookies.set('accessToken', accessToken);
    // Cookies.set('refreshToken', refreshToken);
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    // Cookies.remove('accessToken');
    // Cookies.remove('refreshToken');
    navigate('/');
  };

  const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  };

  

  return {login, logout, isAuthenticated };
}