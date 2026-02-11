import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Share2, Rocket, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import RegistrationModal from '../components/common/RegistrationModal';
import type { Event } from '../types';
import OptimizedImage from '../components/common/OptimizedImage';
import Skeleton from '../components/common/Skeleton';

export default function EventDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: event?.title || 'SIC Event',
            text: event?.description || 'Check out this event at SIC!',
            url: window.location.href,
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback to copy link
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    useEffect(() => {
        async function fetchEvent() {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching event details:', error);
                    navigate('/events');
                } else {
                    setEvent(data);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                navigate('/events');
            } finally {
                setLoading(false);
            }
        }

        fetchEvent();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="bg-bg-main min-h-screen py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-12">
                    <Skeleton className="h-10 w-32" />
                    <div className="theme-card p-12 space-y-6">
                        <Skeleton className="h-12 w-3/4" />
                        <div className="flex gap-4">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                        <Skeleton className="h-64 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (!event) return null;

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-bg-main min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <title>{event.title} | Event Details</title>

            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/events')}
                    className="flex items-center gap-2 text-text-muted hover:text-brand transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Events
                </button>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="theme-card p-8 mb-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Rocket className="w-32 h-32 text-brand" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className={`theme-badge ${event.status === 'upcoming' ? 'animate-pulse' : 'opacity-50 grayscale'}`}>
                                {event.status}
                            </span>
                            <span className="theme-badge border-accent text-accent">
                                Event Details
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-text-primary leading-tight">
                            {event.title}
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 uppercase tracking-widest text-xs font-semibold">
                            <div className="flex items-center gap-3 text-text-secondary">
                                <div className="p-2 rounded-lg bg-bg-surface border border-border-main">
                                    <Calendar className="w-5 h-5 text-brand" />
                                </div>
                                <div>
                                    <p className="text-text-muted mb-1">Date & Time</p>
                                    <p>{formattedDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-text-secondary">
                                <div className="p-2 rounded-lg bg-bg-surface border border-border-main">
                                    <MapPin className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-text-muted mb-1">Location</p>
                                    <p>{event.venue}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {event.status === 'upcoming' && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="theme-button px-8 py-3 font-bold text-lg flex items-center gap-2"
                                >
                                    Register Now
                                    <Rocket className="w-5 h-5" />
                                </button>
                            )}
                            <button
                                onClick={handleShare}
                                className="theme-button-secondary px-8 py-3 font-bold text-lg flex items-center gap-2 group transition-all"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-5 h-5 text-brand" />
                                        <span className="text-brand">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Share
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Content Area */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="theme-card p-8 prose prose-invert prose-brand max-w-none"
                >
                    {event.content_md ? (
                        <div className="markdown-content">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    img: ({ src, alt }) => (
                                        <OptimizedImage
                                            src={src || ''}
                                            alt={alt || ''}
                                            className="w-full h-auto rounded-xl my-8 shadow-2xl"
                                        />
                                    )
                                }}
                            >
                                {event.content_md}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <div className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                            {event.description}
                        </div>
                    )}
                </motion.div>
            </div>

            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={event}
            />

            {/* Markdown Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .markdown-content h1 { font-size: 2.25rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: var(--text-primary); }
                .markdown-content h2 { font-size: 1.875rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: var(--text-primary); border-left: 4px solid var(--brand); padding-left: 1rem; }
                .markdown-content h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; color: var(--text-primary); }
                .markdown-content p { margin-bottom: 1.25rem; line-height: 1.75; color: var(--text-secondary); }
                .markdown-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; color: var(--text-secondary); }
                .markdown-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; color: var(--text-secondary); }
                .markdown-content li { margin-bottom: 0.5rem; }
                .markdown-content a { color: var(--brand); text-decoration: underline; transition: opacity 0.2s; }
                .markdown-content a:hover { opacity: 0.8; }
                .markdown-content blockquote { border-left: 4px solid var(--accent); padding-left: 1.5rem; font-style: italic; margin: 1.5rem 0; color: var(--text-muted); }
                .markdown-content code { background: var(--bg-surface); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.875em; border: 1px solid var(--border-main); }
                .markdown-content pre { background: var(--bg-surface); padding: 1rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1.25rem; border: 1px solid var(--border-main); }
                .markdown-content pre code { background: transparent; padding: 0; border: none; }
                .markdown-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.25rem; font-size: 0.875rem; }
                .markdown-content th { background: var(--bg-surface); text-align: left; padding: 0.75rem; border: 1px solid var(--border-main); font-weight: 600; }
                .markdown-content td { padding: 0.75rem; border: 1px solid var(--border-main); }
                .markdown-content img { border-radius: 8px; margin: 1.5rem 0; max-width: 100%; height: auto; border: 1px solid var(--border-main); }
            `}} />
        </div>
    );
}
