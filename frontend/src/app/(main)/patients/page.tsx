import React, { useEffect, useState } from 'react';
import { getPatients, deletePatient, Patient } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      alert('Failed to fetch patients');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePatient(id);
      fetchPatients();
    } catch (error) {
      alert('Failed to delete patient');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patients List</h1>
      <Button asChild className="mb-4">
        <Link href="/patients/create">Add New Patient</Link>
      </Button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">ID Number</th>
              <th className="py-2 px-4 border-b">Contact</th>
              <th className="py-2 px-4 border-b">Insurance</th>
              <th className="py-2 px-4 border-b">Birth Date</th>
              <th className="py-2 px-4 border-b">Allergies</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="py-2 px-4 border-b">{patient.name}</td>
                <td className="py-2 px-4 border-b">{patient.idNumber}</td>
                <td className="py-2 px-4 border-b">{patient.contact}</td>
                <td className="py-2 px-4 border-b">{patient.insurance}</td>
                <td className="py-2 px-4 border-b">{new Date(patient.birthDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{patient.allergies}</td>
                <td className="py-2 px-4 border-b">
                  <Button asChild variant="outline" size="sm" className="mr-2">
                    <Link href={`/patients/edit/${patient.id}`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(patient.id!)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsPage;