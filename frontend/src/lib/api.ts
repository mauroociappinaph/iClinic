import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

export interface Patient {
  id?: number;
  name: string;
  idNumber: string;
  contact: string;
  insurance?: string;
  birthDate: Date;
  allergies?: string;
  assignedProfessionalId?: number;
}

export const createPatient = async (patient: Patient) => {
  const response = await api.post<Patient>('/patients', patient);
  return response.data;
};

export const getPatientById = async (id: number) => {
  const response = await api.get<Patient>(`/patients/${id}`);
  return response.data;
};

export const updatePatient = async (id: number, patient: Partial<Patient>) => {
  const response = await api.patch<Patient>(`/patients/${id}`, patient);
  return response.data;
};

export const getPatients = async () => {
  const response = await api.get<Patient[]>('/patients');
  return response.data;
};

export const deletePatient = async (id: number) => {
  await api.delete(`/patients/${id}`);
};

export interface DashboardData {
  appointmentsToday: number;
  newPatientsToday: number;
  totalPatients: number;
}

export const getDashboardData = async () => {
  const response = await api.get<DashboardData>('/dashboard');
  return response.data;
};

export interface Appointment {
  id?: number;
  date: Date;
  time: string;
  patientId: number;
  professionalId?: number;
  status?: string;
}

export const getAppointments = async () => {
  const response = await api.get<Appointment[]>('/appointments');
  return response.data;
};

export const createAppointment = async (appointment: Appointment) => {
  const response = await api.post<Appointment>('/appointments', appointment);
  return response.data;
};

export const updateAppointment = async (id: number, appointment: Partial<Appointment>) => {
  const response = await api.patch<Appointment>(`/appointments/${id}`, appointment);
  return response.data;
};

export const deleteAppointment = async (id: number) => {
  await api.delete(`/appointments/${id}`);
};

export const getUpcomingAppointments = async () => {
  const response = await api.get<Appointment[]>('/appointments/upcoming');
  return response.data;
};