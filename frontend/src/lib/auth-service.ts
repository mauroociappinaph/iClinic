import api from './api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (nombre: string, email: string, password: string, rol: string) => {
  const response = await api.post('/auth/register', { nombre, email, password, rol });
  return response.data;
};
