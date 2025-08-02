"use client";

import React, { useEffect, useState } from 'react';
import { getDashboardData, DashboardData, getUpcomingAppointments, Appointment } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Users, UserPlus } from 'lucide-react';

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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.appointmentsToday}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Patients Today</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.newPatientsToday}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalPatients}</div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading dashboard data...</div>
      )}

      <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
      {upcomingAppointments.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      ) : (
        <p>No upcoming appointments.</p>
      )}
    </div>
  );
};

export default DashboardPage;