import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from '../components/IntroScreen';
import EventCard from '../components/EventCard';
import { supabase } from '../services/supabaseClient';
import type { Event } from '../types';
import heroBg from '../assets/image.png';

// Module-level variable to track intro state across navigation within the same session refresh.
// This resets to false only when the page is fully reloaded (refreshed).
let hasPlayedIntro = false;

export default function Home() {
    const [showIntro, setShowIntro] = useState(!hasPlayedIntro);
    const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    const handleIntroComplete = () => {
        setShowIntro(false);
        hasPlayedIntro = true;
    };

    useEffect(() => {
        async function fetchFeaturedEvents() {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .eq('status', 'upcoming')
                    .limit(3)
                    .order('date', { ascending: true });

                if (error) {
                    console.error('Error fetching featured events:', error);
                } else {
                    setFeaturedEvents(data || []);
                }
            } catch (err) {
                console.error('Unexpected error fetching featured events:', err);
            } finally {
                setLoadingEvents(false);
            }
        }

        fetchFeaturedEvents();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <AnimatePresence>
                {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative bg-bg-main text-text-primary py-24 sm:py-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0 text-white">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/30 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />

                    {/* The "Emotional" Hero Image with Infinite Scroll */}
                    <div
                        className="absolute inset-0 bg-[length:auto_100%] bg-repeat-x opacity-60 transition-opacity duration-1000 animate-pan md:bg-cover md:bg-center md:animate-none"
                        style={{ backgroundImage: `url(${heroBg})` }}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/40 to-transparent" />
                    <div className="absolute inset-0 bg-bg-main/20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-brand via-accent to-brand-hover drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        Science and Innovation Club
                    </h1>
                    <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-md">
                        Where ideas come to life. <span className="text-accent font-medium">Innovate</span>, <span className="text-brand font-medium">Build</span>, and <span className="text-accent-soft font-medium">Deploy</span> the future.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            to="/join"
                            className="px-8 py-3 bg-brand hover:bg-brand-hover text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.5)] border border-brand hover:border-accent"
                        >
                            Join SIC
                        </Link>
                        <Link
                            to="/events"
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-md transition-all border border-white/20 hover:border-accent/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        >
                            View Events
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Events Section */}
            <section className="py-20 bg-bg-main">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-text-primary mb-4">Upcoming Events</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">
                            Don't miss out on our latest workshops, tech talks, and hackathons.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loadingEvents ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="bg-bg-surface rounded-2xl h-80 border border-border-main animate-pulse shadow-lg" />
                            ))
                        ) : featuredEvents.length > 0 ? (
                            featuredEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-text-muted italic">No upcoming events found.</p>
                        )}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/events"
                            className="inline-flex items-center text-accent font-semibold hover:text-accent-soft transition-colors"
                        >
                            View All Events
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-20 bg-bg-surface border-y border-border-main">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="p-8 rounded-2xl bg-bg-main border border-border-main hover:border-brand/30 transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.1)] group">
                            <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">Learn</h3>
                            <p className="text-text-secondary">
                                Workshops and sessions on cutting-edge technologies to keep you ahead of the curve.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-bg-main border border-border-main hover:border-accent/30 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] group">
                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">Connect</h3>
                            <p className="text-text-secondary">
                                Network with like-minded peers, alumni, and industry professionals.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-bg-main border border-border-main hover:border-brand-hover/30 transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] group">
                            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">Build</h3>
                            <p className="text-text-secondary">
                                Apply your skills in hackathons and projects that solve real-world problems.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
