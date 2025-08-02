import { LoginForm } from '@/components/auth/login-form';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;