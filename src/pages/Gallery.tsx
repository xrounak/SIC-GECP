import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import type { GalleryImage } from '../types';

export default function Gallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchImages() {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching gallery:', error);
                } else {
                    setImages(data || []);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchImages();
    }, []);

    return (
        <div className="bg-bg-main min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-text-primary to-text-secondary">
                        Gallery
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg">
                        Moments from our journey.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                    </div>
                ) : images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image) => (
                            <div key={image.id} className="relative group overflow-hidden rounded-xl shadow-lg border border-border-main cursor-pointer hover:border-accent/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300">
                                <img
                                    src={image.image_url}
                                    alt={image.caption}
                                    className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 via-bg-main/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-accent font-medium text-lg text-glow">{image.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-text-muted italic">No images found in gallery.</p>
                )}
            </div>
        </div>
    );
}
