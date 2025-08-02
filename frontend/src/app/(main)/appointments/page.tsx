import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment, Appointment as ApiAppointment } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  patientId: number;
  professionalId?: number;
}

const AppointmentsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    patientId: '',
    professionalId: '',
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      const formattedEvents = data.map((appointment) => ({
        id: appointment.id!,
        title: `Appointment with Patient ${appointment.patientId}`,
        start: new Date(`${appointment.date}T${appointment.time}`),
        end: new Date(`${appointment.date}T${appointment.time}`),
        patientId: appointment.patientId,
        professionalId: appointment.professionalId,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      alert('Failed to fetch appointments');
    }
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({
      ...newEvent,
      start: start.toISOString().slice(0, 16),
      end: end.toISOString().slice(0, 16),
    });
  };

  const handleAddEvent = async () => {
    try {
      const newAppointment: ApiAppointment = {
        date: new Date(newEvent.start),
        time: newEvent.start.slice(11, 16),
        patientId: Number(newEvent.patientId),
        professionalId: Number(newEvent.professionalId) || undefined,
      };
      await createAppointment(newAppointment);
      fetchAppointments();
      setNewEvent({ title: '', start: '', end: '', patientId: '', professionalId: '' });
    } catch (error) {
      alert('Failed to create appointment');
    }
  };

  const onEventDrop = async ({ event, start, end }: { event: Event; start: Date; end: Date }) => {
    try {
      const updatedAppointment: ApiAppointment = {
        ...event,
        date: start,
        time: format(start, 'HH:mm'),
      };
      await updateAppointment(event.id, updatedAppointment);
      fetchAppointments();
    } catch (error) {
      alert('Failed to update appointment');
    }
  };

  const onEventResize = async ({ event, start, end }: { event: Event; start: Date; end: Date }) => {
    try {
      const updatedAppointment: ApiAppointment = {
        ...event,
        date: start,
        time: format(start, 'HH:mm'),
      };
      await updateAppointment(event.id, updatedAppointment);
      fetchAppointments();
    } catch (error) {
      alert('Failed to update appointment');
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await deleteAppointment(id);
      fetchAppointments();
    } catch (error) {
      alert('Failed to delete appointment');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments Calendar</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="eventTitle">Title</Label>
              <Input
                id="eventTitle"
                placeholder="Appointment Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                placeholder="Patient ID"
                value={newEvent.patientId}
                onChange={(e) => setNewEvent({ ...newEvent, patientId: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="professionalId">Professional ID (Optional)</Label>
              <Input
                id="professionalId"
                placeholder="Professional ID"
                value={newEvent.professionalId}
                onChange={(e) => setNewEvent({ ...newEvent, professionalId: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="startDate">Start Date/Time</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endDate">End Date/Time</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
              />
            </div>
            <Button onClick={handleAddEvent}>Add Appointment</Button>
          </div>
        </CardContent>
      </Card>
      <div className="h-[600px]">
        <DnDCalendar
          localizer={localizer}
          events={events}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(event) => handleDeleteEvent(event.id)}
          selectable
          resizable
          defaultView="week"
          step={30}
          timeslots={2}
          views={['month', 'week', 'day', 'agenda']}
        />
      </div>
    </div>
  );
};

export default AppointmentsPage;
