import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, Calendar, Share2, ZoomIn, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { GalleryImage } from '../types';
import OptimizedImage from '../components/common/OptimizedImage';
import Skeleton from '../components/common/Skeleton';

export default function GalleryDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [image, setImage] = useState<GalleryImage | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: image?.caption || 'SIC Gallery Moment',
            text: 'Check out this highlight from SIC!',
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
        async function fetchImage() {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching gallery image:', error);
                    navigate('/gallery');
                } else {
                    setImage(data);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                navigate('/gallery');
            } finally {
                setLoading(false);
            }
        }

        fetchImage();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="bg-bg-main min-h-screen py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    <Skeleton className="h-10 w-40" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <Skeleton className="aspect-video lg:aspect-square w-full rounded-2xl" />
                        <div className="space-y-6">
                            <Skeleton className="h-12 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                            <div className="space-y-2 pt-8">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!image) return null;

    return (
        <div className="bg-bg-main min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <title>{image.caption || 'Gallery Image'} | SIC Gallery</title>

            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-text-muted hover:text-brand transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Gallery
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image View */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="theme-card p-2 relative group overflow-hidden">
                            <OptimizedImage
                                src={image.image_url}
                                alt={image.caption}
                                className="w-full rounded-lg shadow-2xl"
                                priority={true}
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                <a
                                    href={image.image_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 bg-brand rounded-full text-white shadow-glow translate-y-4 group-hover:translate-y-0 transition-transform"
                                >
                                    <ZoomIn size={32} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Details View */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="theme-card p-8">
                            <h1 className="text-3xl font-bold text-text-primary mb-4 leading-tight">
                                {image.caption || 'Untitled Moment'}
                            </h1>

                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-text-muted mb-8">
                                <div className="flex items-center gap-2 text-brand">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(image.created_at || '').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Gallery Highlight
                                </div>
                            </div>

                            <div className="prose prose-invert prose-brand max-w-none">
                                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2 border-b border-border-main pb-2">
                                    Event Details
                                </h3>

                                <div className="markdown-content">
                                    {image.details_md ? (
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
                                            {image.details_md}
                                        </ReactMarkdown>
                                    ) : (
                                        <p className="text-text-muted italic">No additional details recorded for this highlight.</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-border-main flex gap-4">
                                <button
                                    onClick={handleShare}
                                    className="flex-1 theme-button py-3 font-bold flex items-center justify-center gap-2 group transition-all"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-5 h-5 text-white" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Share
                                        </>
                                    )}
                                </button>
                                <a
                                    href={image.image_url}
                                    download
                                    className="theme-button-secondary flex-1 py-3 text-center font-bold"
                                >
                                    Download Image
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Markdown Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .markdown-content p { margin-bottom: 1.25rem; line-height: 1.75; color: var(--text-secondary); }
                .markdown-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; color: var(--text-secondary); }
                .markdown-content a { color: var(--brand); text-decoration: underline; }
                .markdown-content strong { color: var(--text-primary); }
            `}} />
        </div>
    );
}
