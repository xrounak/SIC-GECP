import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Calendar, MapPin, Trash2, Edit2, Plus, X } from 'lucide-react';
import type { Event } from '../../types';

export default function EventManager() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        venue: '',
        status: 'upcoming' as 'upcoming' | 'past'
    });

    useEffect(() => {
        fetchEvents();
    }, []);

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
                setEditingEvent(null);
                fetchEvents();
            }
        } else {
            const { error } = await supabase
                .from('events')
                .insert([{ title, description, date, venue, status }]);

            if (error) alert('Error adding event');
            else {
                setIsAdding(false);
                setFormData({ title: '', description: '', date: '', venue: '', status: 'upcoming' });
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
            date: new Date(event.date).toISOString().slice(0, 16),
            venue: event.venue,
            status: event.status
        });
        setIsAdding(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-text-primary">Manage Events</h3>
                <button
                    onClick={() => {
                        setIsAdding(!isAdding);
                        setEditingEvent(null);
                        setFormData({ title: '', description: '', date: '', venue: '', status: 'upcoming' });
                    }}
                    className="theme-button flex items-center gap-2 py-2"
                >
                    {isAdding ? <X size={18} /> : <Plus size={18} />}
                    {isAdding ? 'Cancel' : 'Add Event'}
                </button>
            </div>

            {isAdding && (
                <div className="theme-card p-6 animate-in slide-in-from-top duration-300">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-text-secondary mb-2">Event Title</label>
                            <input
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-text-secondary mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-2">Date & Time</label>
                            <input
                                required
                                type="datetime-local"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-2">Venue</label>
                            <input
                                required
                                value={formData.venue}
                                onChange={e => setFormData({ ...formData, venue: e.target.value })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors"
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className="theme-button px-12">
                                {editingEvent ? 'Update Event' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

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
