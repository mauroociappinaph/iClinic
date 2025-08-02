import React, { useEffect, useState } from 'react';
import { PatientForm } from '@/components/patients/patient-form';
import { useRouter, useParams } from 'next/navigation';
import { getPatientById, updatePatient } from '@/lib/api';
import { Patient } from '@/lib/api';

const EditPatientPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        try {
          const patientData = await getPatientById(Number(id));
          setPatient(patientData);
        } catch (error) {
          alert('Failed to fetch patient');
        }
      };
      fetchPatient();
    }
  }, [id]);

  const handleSubmit = async (patientData: Patient) => {
    try {
      await updatePatient(Number(id), patientData);
      router.push('/patients');
    } catch (error) {
      alert('Failed to update patient');
    }
  };

  if (!patient) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <PatientForm initialData={patient} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditPatientPage;
