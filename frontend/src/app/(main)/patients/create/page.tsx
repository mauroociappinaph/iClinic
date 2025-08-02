import React from 'react';
import { PatientForm } from '@/components/patients/patient-form';
import { useRouter } from 'next/navigation';
import { createPatient } from '@/lib/api';

const CreatePatientPage = () => {
  const router = useRouter();

  const handleSubmit = async (patientData: any) => {
    try {
      await createPatient(patientData);
      router.push('/patients');
    } catch (error) {
      alert('Failed to create patient');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <PatientForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePatientPage;
