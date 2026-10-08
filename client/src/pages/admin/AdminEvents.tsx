import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Plus, Trash2, Edit2, X } from 'lucide-react';
import { api } from '../../services/api';
import { EventItem } from '../../types';

const eventSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.string().default('RAMP_SHOW'),
  eventDate: z.string().min(1, 'Date is required'),
  venue: z.string().min(2, 'Venue is required'),
  description: z.string().min(5, 'Description is required'),
  status: z.enum(['UPCOMING', 'COMPLETED', 'CANCELLED']).default('UPCOMING'),
  coverImageUrl: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      category: 'RAMP_SHOW',
      status: 'UPCOMING',
    },
  });

  const loadData = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data || []);
    } catch {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({
      title: '',
      category: 'RAMP_SHOW',
      eventDate: new Date().toISOString().slice(0, 16),
      venue: '',
      description: '',
      status: 'UPCOMING',
      coverImageUrl: '/images/shoots/shoot-20260403-sd0-8440.jpg',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: EventItem) => {
    setEditingItem(item);
    reset({
      title: item.title,
      category: item.category,
      eventDate: new Date(item.eventDate).toISOString().slice(0, 16),
      venue: item.venue,
      description: item.description,
      status: item.status,
      coverImageUrl: item.coverImageUrl || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete event from calendar?')) return;
    try {
      await api.deleteEvent(id);
      setEvents(events.filter((e) => e.id !== id));
    } catch {
      alert('Error deleting event');
    }
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      if (editingItem) {
        const updated = await api.updateEvent(editingItem.id, data);
        setEvents(events.map((e) => (e.id === editingItem.id ? updated : e)));
      } else {
        const created = await api.createEvent(data);
        setEvents([created, ...events]);
      }
      setModalOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Error saving event');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-vogue-gold/20">
        <div>
          <span className="font-script text-3xl text-vogue-gold block">Runway Calendar</span>
          <h1 className="font-serif text-3xl font-bold text-vogue-ivory">
            Manage Events &amp; Workshops
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-vogue-gold text-vogue-black text-xs font-bold uppercase tracking-wider hover:bg-vogue-gold-light transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      <div className="bg-vogue-dark border border-vogue-gold/20 rounded-sm overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="border-b border-vogue-gold/20 bg-vogue-black/50 text-vogue-gold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Event Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Venue</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vogue-gold/10">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-vogue-black/30">
                <td className="py-3.5 px-4 font-semibold text-vogue-ivory">
                  {event.title}
                </td>
                <td className="py-3.5 px-4 text-vogue-champagne/80">
                  {event.category}
                </td>
                <td className="py-3.5 px-4 font-mono text-vogue-champagne">
                  {new Date(event.eventDate).toLocaleDateString()}
                </td>
                <td className="py-3.5 px-4 text-vogue-champagne/80">
                  {event.venue}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                      event.status === 'UPCOMING'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(event)}
                    className="p-1.5 text-vogue-champagne hover:text-vogue-gold"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-1.5 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-vogue-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-vogue-dark border border-vogue-gold/40 p-6 sm:p-8 max-w-lg w-full rounded-sm shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-vogue-champagne hover:text-vogue-gold"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-vogue-ivory mb-6">
              {editingItem ? 'Edit Event' : 'Create Event'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                  Title *
                </label>
                <input
                  {...register('title')}
                  className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                    Category *
                  </label>
                  <select
                    {...register('category')}
                    className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory"
                  >
                    <option value="RAMP_SHOW">Ramp Show</option>
                    <option value="WORKSHOP">Workshop</option>
                    <option value="COMPETITION">Competition</option>
                    <option value="AUDITIONS">Auditions</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                    Date &amp; Time *
                  </label>
                  <input
                    type="datetime-local"
                    {...register('eventDate')}
                    className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                  Venue *
                </label>
                <input
                  {...register('venue')}
                  placeholder="e.g. ITER Auditorium"
                  className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                  Description *
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                  Status
                </label>
                <select
                  {...register('status')}
                  className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory"
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-vogue-gold/30 text-vogue-champagne uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-vogue-gold text-vogue-black uppercase font-bold hover:bg-vogue-gold-light"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
