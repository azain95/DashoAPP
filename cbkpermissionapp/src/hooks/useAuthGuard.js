import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function useAuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get('user');
    const token = Cookies.get('token');
    if (!user || !token) {
      Cookies.remove('user');
      Cookies.remove('token');
      navigate('/signin');
    }
  }, [navigate]);
}
