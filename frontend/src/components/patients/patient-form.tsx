import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Patient } from '@/lib/api';

interface PatientFormProps {
  initialData?: Patient;
  onSubmit: (data: Patient) => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSubmit }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [idNumber, setIdNumber] = useState(initialData?.idNumber || '');
  const [contact, setContact] = useState(initialData?.contact || '');
  const [insurance, setInsurance] = useState(initialData?.insurance || '');
  const [birthDate, setBirthDate] = useState(initialData?.birthDate ? new Date(initialData.birthDate).toISOString().split('T')[0] : '');
  const [allergies, setAllergies] = useState(initialData?.allergies || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIdNumber(initialData.idNumber);
      setContact(initialData.contact);
      setInsurance(initialData.insurance);
      setBirthDate(initialData.birthDate ? new Date(initialData.birthDate).toISOString().split('T')[0] : '');
      setAllergies(initialData.allergies);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      name,
      idNumber,
      contact,
      insurance,
      birthDate: new Date(birthDate),
      allergies,
    } as Patient);
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center">{initialData ? 'Edit Patient' : 'Create Patient'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input id="idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="insurance">Insurance</Label>
              <Input id="insurance" value={insurance} onChange={(e) => setInsurance(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="allergies">Allergies</Label>
              <Input id="allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">{initialData ? 'Update Patient' : 'Create Patient'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
