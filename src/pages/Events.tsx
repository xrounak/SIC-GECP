import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import EventCard from '../components/common/EventCard';
import type { Event } from '../types';
import Skeleton from '../components/common/Skeleton';

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .order('date', { ascending: true });

                if (error) {
                    console.error('Error fetching events:', error);
                } else {
                    setEvents(data || []);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    const upcomingEvents = events.filter(e => e.status === 'upcoming');
    const pastEvents = events.filter(e => e.status === 'past');

    return (
        <div className="bg-bg-main min-h-screen py-24 transition-colors duration-500">
            <title>Upcoming Events & Workshops | SIC GEC Palamu</title>
            <meta
                name="description"
                content="Stay updated with the latest tech events, workshops, hackathons, and seminars organized by the Science and Innovation Club at GEC Palamu."
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent via-brand to-accent drop-shadow-sm">
                        Events & Workshops
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                        Join us for workshops, seminars, and hackathons.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="theme-card h-[400px] flex flex-col">
                                <Skeleton className="h-48 w-full" />
                                <div className="p-6 flex-1 space-y-4">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-8 w-3/4" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Upcoming Events */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold text-text-primary mb-8 border-l-4 border-brand pl-4 flex items-center transition-all">
                                Upcoming Events
                                <span className="ml-3 px-2 py-0.5 text-xs bg-brand/10 text-brand rounded-full animate-pulse border border-brand/20">LIVE</span>
                            </h2>
                            {upcomingEvents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {upcomingEvents.map((event) => (
                                        <EventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            ) : (
                                <p className="theme-card text-text-muted italic p-8 text-center bg-bg-surface/30">
                                    No upcoming events scheduled. Stay tuned!
                                </p>
                            )}
                        </section>

                        {/* Past Events */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-secondary mb-8 border-l-4 border-border-main pl-4 transition-all">
                                Past Events
                            </h2>
                            {pastEvents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {pastEvents.map((event) => (
                                        <EventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-text-muted italic">No past events found.</p>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}
