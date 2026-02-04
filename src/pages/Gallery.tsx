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

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
                    </div>
                ) : images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image) => (
                            <div key={image.id} className="theme-card relative group overflow-hidden cursor-pointer transition-all duration-300">
                                <img
                                    src={image.image_url}
                                    alt={image.caption}
                                    className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    style={{ borderRadius: 'var(--radius-main)' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 via-bg-main/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6" style={{ borderRadius: 'var(--radius-main)' }}>
                                    <p className="text-brand font-medium text-lg drop-shadow-sm">{image.caption}</p>
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
