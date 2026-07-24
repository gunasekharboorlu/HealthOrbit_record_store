import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForms from '../../components/AuthForms';

interface RegisterPageProps {
  authRole: 'patient' | 'doctor' | 'admin';
  setAuthRole: (role: 'patient' | 'doctor' | 'admin') => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  dob: string;
  setDob: (val: string) => void;
  gender: string;
  setGender: (val: string) => void;
  bloodGroup: string;
  setBloodGroup: (val: string) => void;
  specialization: string;
  setSpecialization: (val: string) => void;
  licenseNumber: string;
  setLicenseNumber: (val: string) => void;
  hospitalId: string;
  setHospitalId: (val: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  handleRegister: (e: React.FormEvent) => void;
}

export default function RegisterPage(props: RegisterPageProps) {
  const navigate = useNavigate();

  const setView = (view: string) => {
    if (view === 'login') navigate('/login');
    else navigate('/register');
  };

  return (
    <AuthForms
      {...props}
      view="register"
      setView={setView}
    />
  );
}
