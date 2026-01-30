import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Calendar, MapPin, Trash2, Edit2, Plus } from 'lucide-react';
import type { Event } from '../../types';

import AdminModal from './AdminModal';

export default function EventManager() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        venue: '',
        status: 'upcoming' as 'upcoming' | 'past'
    });

    // Helper to convert Date to local datetime-local string (YYYY-MM-DDTHH:mm)
    const toLocalISOString = (date: Date) => {
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().slice(0, 16);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const resetForm = () => {
        setFormData({ title: '', description: '', date: '', venue: '', status: 'upcoming' });
        setEditingEvent(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    async function fetchEvents() {
        setLoading(true);
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: false });

        if (error) console.error('Error fetching events:', error);
        else setEvents(data || []);
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { title, description, date, venue, status } = formData;

        if (editingEvent) {
            const { error } = await supabase
                .from('events')
                .update({ title, description, date, venue, status })
                .eq('id', editingEvent.id);

            if (error) alert('Error updating event');
            else {
                handleCloseModal();
                fetchEvents();
            }
        } else {
            const { error } = await supabase
                .from('events')
                .insert([{ title, description, date, venue, status }]);

            if (error) alert('Error adding event');
            else {
                handleCloseModal();
                fetchEvents();
            }
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this event?')) return;

        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (error) alert('Error deleting event');
        else fetchEvents();
    }

    const openEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description || '',
            date: toLocalISOString(new Date(event.date)),
            venue: event.venue,
            status: event.status
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-bg-surface/30 p-4 rounded-2xl border border-border-main backdrop-blur-sm">
                <div>
                    <h3 className="text-xl font-bold text-text-primary">Manage Events</h3>
                    <p className="text-xs text-text-muted mt-1">Add, update or remove club events</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="theme-button flex items-center gap-2 py-2.5 px-6 shadow-lg shadow-brand/10"
                >
                    <Plus size={18} />
                    <span>Add Event</span>
                </button>
            </div>

            <AdminModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingEvent ? 'Edit Event' : 'Create New Event'}
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2 space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Event Title</label>
                        <input
                            required
                            placeholder="e.g. Annual Tech Symposium"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                        />
                    </div>
                    <div className="col-span-2 space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Description</label>
                        <textarea
                            placeholder="Tell everyone what this event is about..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand focus:ring-1 focus:ring-brand transition-all h-32"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Date & Time</label>
                        <input
                            required
                            type="datetime-local"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand focus:ring-1 focus:ring-brand transition-all [color-scheme:dark]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Venue</label>
                        <input
                            required
                            placeholder="e.g. Main Auditorium"
                            value={formData.venue}
                            onChange={e => setFormData({ ...formData, venue: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand focus:ring-1 focus:ring-brand transition-all cursor-pointer"
                        >
                            <option value="upcoming">Upcoming</option>
                            <option value="past">Past</option>
                        </select>
                    </div>
                    <div className="md:col-span-2 flex justify-end pt-2">
                        <button type="submit" className="theme-button w-full sm:w-auto px-12 py-3 font-bold shadow-xl shadow-brand/20">
                            {editingEvent ? 'Save Changes' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </AdminModal>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div></div>
                ) : events.length > 0 ? (
                    events.map(event => (
                        <div key={event.id} className="theme-card p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-brand/40 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-text-primary">{event.title}</h4>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${event.status === 'upcoming' ? 'bg-brand/20 text-brand' : 'bg-text-muted/20 text-text-muted'
                                        }`}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(event.date).toLocaleString()}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.venue}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEdit(event)}
                                    className="p-2 hover:bg-brand/10 text-text-secondary hover:text-brand rounded-lg transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="p-2 hover:bg-red-500/10 text-text-secondary hover:text-red-500 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="theme-card p-12 text-center text-text-muted italic">No events found. Add one to get started.</div>
                )}
            </div>
        </div>
    );
}
