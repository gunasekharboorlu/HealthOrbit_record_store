import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../../components/LandingPage';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSetView = (view: string) => {
    if (view === 'login') navigate('/login');
    else if (view === 'register') navigate('/register');
    else if (view === 'emergency-view') navigate('/app/emergency');
    else navigate('/');
  };

  const handleSetAuthRole = (role: string) => {
    // Stored or passed in query
  };

  return <LandingPage setView={handleSetView} setAuthRole={handleSetAuthRole} />;
}
