import { useState } from 'react';
import type { Event } from '../types';
import RegistrationModal from './RegistrationModal';

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const isUpcoming = event.status === 'upcoming';
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
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
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="theme-button w-full py-2 px-4 font-medium transition-all text-sm"
                            >
                                Register Now
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Registration Modal */}
            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={event}
            />
        </>
    );
}
