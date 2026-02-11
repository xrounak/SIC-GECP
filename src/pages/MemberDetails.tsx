import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Shield, Share2, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Member } from '../types';
import OptimizedImage from '../components/common/OptimizedImage';
import Skeleton from '../components/common/Skeleton';

export default function MemberDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [member, setMember] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: `${member?.name} | SIC Member`,
            text: `Meet ${member?.name}, ${member?.role} at SIC!`,
            url: window.location.href,
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
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
        async function fetchMember() {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from('members')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching member details:', error);
                    navigate('/');
                } else {
                    setMember(data);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                navigate('/');
            } finally {
                setLoading(false);
            }
        }

        fetchMember();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="bg-bg-main min-h-screen py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-12">
                    <Skeleton className="h-10 w-32" />
                    <div className="theme-card p-12 space-y-8 flex flex-col md:flex-row gap-12">
                        <Skeleton className="w-48 h-48 rounded-2xl flex-shrink-0" />
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-12 w-3/4" />
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-10 w-48 mt-8" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!member) return null;

    return (
        <div className="bg-bg-main min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <title>{member.name} | Member Profile</title>

            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-text-muted hover:text-brand transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="theme-card p-8 mb-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <User className="w-48 h-48 text-brand" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-brand shadow-glow flex-shrink-0">
                            {member.image_url ? (
                                <OptimizedImage
                                    src={member.image_url}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    priority={true}
                                />
                            ) : (
                                <div className="w-full h-full bg-bg-surface flex items-center justify-center text-text-muted">
                                    <User size={64} />
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-text-primary mb-2">{member.name}</h1>
                            <p className="text-xl text-brand font-medium mb-4">{member.role}</p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm mb-6">
                                <span className="theme-badge border-accent text-accent">
                                    <Shield className="w-4 h-4" />
                                    {member.domain}
                                </span>
                            </div>

                            <button
                                onClick={handleShare}
                                className="theme-button-secondary py-2 px-6 font-bold flex items-center gap-2 group transition-all"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-brand" />
                                        <span className="text-brand">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        Share Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* About Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="theme-card p-8"
                >
                    <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                        About {member.name.split(' ')[0]}
                        <div className="h-px flex-1 bg-gradient-to-r from-brand/50 to-transparent"></div>
                    </h2>

                    <div className="markdown-content">
                        {member.bio_md ? (
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
                                {member.bio_md}
                            </ReactMarkdown>
                        ) : (
                            <p className="text-text-muted italic">No biography provided.</p>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Markdown Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .markdown-content h1 { font-size: 2rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: var(--text-primary); }
                .markdown-content h2 { font-size: 1.5rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: var(--text-primary); }
                .markdown-content p { margin-bottom: 1.25rem; line-height: 1.75; color: var(--text-secondary); }
                .markdown-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; color: var(--text-secondary); }
                .markdown-content a { color: var(--brand); text-decoration: underline; }
            `}} />
        </div>
    );
}
