import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { sendTelegramNotification } from '../utils/telegram';
import type { Event } from '../types';

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const isUpcoming = event.status === 'upcoming';
    const [isExpanding, setIsExpanding] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) {
            alert('Supabase not configured. Dummy registration successful!');
            setStatus('success');
            return;
        }

        setStatus('submitting');
        try {
            const { error } = await supabase
                .from('event_registrations')
                .insert([{
                    event_id: event.id,
                    name: formData.name,
                    email: formData.email
                }]);

            if (error) throw error;

            // Send Telegram Notification
            await sendTelegramNotification(
                `🎟️ *New Event Registration*\n\n` +
                `*Event:* ${event.title}\n` +
                `*Date:* ${new Date(event.date).toLocaleDateString()}\n` +
                `*Name:* ${formData.name}\n` +
                `*Email:* ${formData.email}`
            );

            setStatus('success');
        } catch (err) {
            console.error('Registration failed:', err);
            setStatus('error');
        }
    };

    return (
        <div className="theme-card transition-all duration-300 overflow-hidden flex flex-col h-full group">
            <div className={`h-1 ${isUpcoming ? 'bg-gradient-to-r from-brand to-accent' : 'bg-text-muted/20'}`} />
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${isUpcoming
                        ? 'bg-brand/10 text-brand border-brand/20'
                        : 'bg-text-muted/10 text-text-muted border-text-muted/20'
                        }`}>
                        {isUpcoming ? 'Upcoming' : 'Past'}
                    </span>
                    <div className="text-right">
                        <p className="text-sm font-bold text-accent">
                            {new Date(event.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="text-xs text-text-muted">
                            {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric' })}
                        </p>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand transition-colors">{event.title}</h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-grow">{event.description}</p>

                <div className="flex items-center text-text-muted text-sm mb-6">
                    <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.venue}
                </div>

                {isUpcoming && (
                    <div className="mt-auto pt-4 border-t border-border-main">
                        {!isExpanding && status === 'idle' && (
                            <button
                                onClick={() => setIsExpanding(true)}
                                className="theme-button w-full py-2 px-4 font-medium transition-all text-sm"
                            >
                                Register Now
                            </button>
                        )}

                        {isExpanding && status === 'idle' && (
                            <form onSubmit={handleRegister} className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    className="theme-card w-full px-3 py-2 text-sm bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand placeholder-text-muted"
                                    style={{ borderRadius: 'var(--radius-main)' }}
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    className="theme-card w-full px-3 py-2 text-sm bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand placeholder-text-muted"
                                    style={{ borderRadius: 'var(--radius-main)' }}
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanding(false)}
                                        className="flex-1 py-2 text-sm text-text-muted hover:text-text-primary font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="theme-button flex-1 py-2 text-sm font-medium"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        )}

                        {status === 'submitting' && (
                            <div className="text-center py-2 text-accent text-sm font-medium animate-pulse">
                                Registering...
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="text-center py-2 text-green-400 text-sm font-medium bg-green-400/10 rounded-lg border border-green-400/20">
                                ✓ Registered Successfully
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="text-center">
                                <p className="py-2 text-red-400 text-sm font-medium">Registration Failed</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="text-xs text-brand hover:underline"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
