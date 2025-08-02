"use client";

import React, { useEffect, useState } from 'react';
import { getDashboardData, DashboardData, getUpcomingAppointments, Appointment } from '@/lib/api';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);

        const upcoming = await getUpcomingAppointments();
        setUpcomingAppointments(upcoming);
      } catch (error) {
        alert('Failed to fetch dashboard data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {dashboardData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Appointments Today</h2>
            <p className="text-3xl font-bold">{dashboardData.appointmentsToday}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">New Patients Today</h2>
            <p className="text-3xl font-bold">{dashboardData.newPatientsToday}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Patients</h2>
            <p className="text-3xl font-bold">{dashboardData.totalPatients}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading dashboard data...</div>
      )}

      <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
      {upcomingAppointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Patient ID</th>
                <th className="py-2 px-4 border-b">Professional ID</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="py-2 px-4 border-b">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{appointment.time}</td>
                  <td className="py-2 px-4 border-b">{appointment.patientId}</td>
                  <td className="py-2 px-4 border-b">{appointment.professionalId || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No upcoming appointments.</p>
      )}
    </div>
  );
};

export default DashboardPage;
