import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import type { GalleryImage } from '../types';
import { ZoomIn, Loader2 } from 'lucide-react';
import OptimizedImage from '../components/common/OptimizedImage';
import Skeleton from '../components/common/Skeleton';

const CHUNK_SIZE = 9;

export default function Gallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastImageRef = useCallback((node: HTMLAnchorElement | null) => {
        if (loading || loadingMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, loadingMore, hasMore]);

    const fetchImages = useCallback(async (pageNum: number) => {
        try {
            pageNum === 0 ? setLoading(true) : setLoadingMore(true);

            const from = pageNum * CHUNK_SIZE;
            const to = from + CHUNK_SIZE - 1;

            const { data, error, count } = await supabase
                .from('gallery')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) {
                console.error('Error fetching gallery:', error);
            } else {
                setImages(prev => pageNum === 0 ? (data || []) : [...prev, ...(data || [])]);
                if (count !== null) {
                    setHasMore(images.length + (data?.length || 0) < count);
                }
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [images.length]);

    useEffect(() => {
        fetchImages(page);
    }, [page, fetchImages]);

    return (
        <div className="bg-bg-main min-h-screen py-24 transition-colors duration-500">
            <title>Event Gallery & Highlights | SIC GEC Palamu</title>
            <meta
                name="description"
                content="Explore the visual journey of the Science and Innovation Club at GEC Palamu. Photos and videos from our latest tech fests and innovation workshops."
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-text-primary to-text-secondary drop-shadow-sm">
                        Gallery
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                        Moments from our journey.
                    </p>
                </div>

                {loading && page === 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <Skeleton key={i} className="theme-card h-72" />
                        ))}
                    </div>
                ) : images.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {images.map((image, index) => (
                                <Link
                                    key={image.id}
                                    to={`/gallery/${image.id}`}
                                    ref={index === images.length - 1 ? lastImageRef : null}
                                    className="theme-card relative group overflow-hidden cursor-pointer transition-all duration-300 block"
                                >
                                    <div className="h-72 overflow-hidden">
                                        <OptimizedImage
                                            src={image.image_url}
                                            alt={image.caption}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            style={{ borderRadius: 'var(--radius-main)' }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" style={{ borderRadius: 'var(--radius-main)' }}>
                                        <div className="flex items-center justify-between">
                                            <p className="text-brand font-medium text-lg drop-shadow-sm">{image.caption}</p>
                                            <div className="p-2 bg-brand/10 backdrop-blur-md rounded-lg text-brand border border-brand/20">
                                                <ZoomIn size={18} />
                                            </div>
                                        </div>
                                        <p className="text-text-muted text-[10px] sm:text-xs mt-2 uppercase tracking-widest font-bold border-l-2 border-brand pl-2">See Highlights</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {loadingMore && (
                            <div className="flex justify-center mt-12">
                                <Loader2 className="w-8 h-8 text-brand animate-spin" />
                            </div>
                        )}

                        {!hasMore && images.length > 0 && (
                            <p className="text-center text-text-muted mt-12 italic">You've reached the end of our journey.</p>
                        )}
                    </>
                ) : (
                    <p className="text-center text-text-muted italic">No images found in gallery.</p>
                )}
            </div>
        </div>
    );
}
