import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Trash2, Edit2, Plus } from 'lucide-react';
import type { GalleryImage } from '../../types';

import AdminModal from './AdminModal';
import OptimizedImage from '../common/OptimizedImage';

export default function GalleryManager() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

    const [formData, setFormData] = useState({
        image_url: '',
        caption: '',
        details_md: ''
    });

    useEffect(() => {
        fetchImages();
    }, []);

    const resetForm = () => {
        setFormData({ image_url: '', caption: '', details_md: '' });
        setEditingImage(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    async function fetchImages() {
        setLoading(true);
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching gallery:', error);
        else setImages(data || []);
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { image_url, caption, details_md } = formData;

        if (editingImage) {
            const { error } = await supabase
                .from('gallery')
                .update({ image_url, caption, details_md })
                .eq('id', editingImage.id);

            if (error) alert('Error updating image');
            else {
                handleCloseModal();
                fetchImages();
            }
        } else {
            const { error } = await supabase
                .from('gallery')
                .insert([{ image_url, caption, details_md }]);

            if (error) alert('Error adding image');
            else {
                handleCloseModal();
                fetchImages();
            }
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to remove this image from the gallery?')) return;

        const { error } = await supabase
            .from('gallery')
            .delete()
            .eq('id', id);

        if (error) alert('Error deleting image');
        else fetchImages();
    }

    const openEdit = (img: GalleryImage) => {
        setEditingImage(img);
        setFormData({
            image_url: img.image_url,
            caption: img.caption || '',
            details_md: img.details_md || ''
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-bg-surface/30 p-4 rounded-2xl border border-border-main backdrop-blur-sm">
                <div>
                    <h3 className="text-xl font-bold text-text-primary">Manage Gallery</h3>
                    <p className="text-xs text-text-muted mt-1">Upload and manage club highlights</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="theme-button flex items-center gap-2 py-2.5 px-6 shadow-lg shadow-brand/10"
                >
                    <Plus size={18} />
                    <span>Add Image</span>
                </button>
            </div>

            <AdminModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingImage ? 'Edit Gallery Entry' : 'Add to Gallery'}
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Image URL</label>
                        <input
                            required
                            placeholder="https://images.unsplash.com/..."
                            value={formData.image_url}
                            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Caption</label>
                        <input
                            placeholder="e.g. Workshop on IoT and AI"
                            value={formData.caption}
                            onChange={e => setFormData({ ...formData, caption: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1 text-brand">Image Details (Markdown)</label>
                        <textarea
                            placeholder="Add more context about this photo (supports Markdown)..."
                            value={formData.details_md}
                            onChange={e => setFormData({ ...formData, details_md: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand transition-all font-mono text-sm h-32"
                        />
                    </div>

                    {formData.image_url && (
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase tracking-widest text-text-muted ml-1">Image Preview</p>
                            <div className="border border-border-main rounded-2xl overflow-hidden shadow-2xl h-64">
                                <OptimizedImage
                                    src={formData.image_url}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    priority={true}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end pt-2">
                        <button type="submit" className="theme-button w-full sm:w-auto px-12 py-3 font-bold shadow-xl shadow-brand/20">
                            {editingImage ? 'Update Entry' : 'Add to Gallery'}
                        </button>
                    </div>
                </form>
            </AdminModal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div></div>
                ) : images.length > 0 ? (
                    images.map(img => (
                        <div key={img.id} className="theme-card group relative aspect-square overflow-hidden hover:border-brand/40 transition-colors">
                            <OptimizedImage
                                src={img.image_url}
                                alt={img.caption || ''}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 backdrop-blur-[2px]">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => openEdit(img)}
                                        className="p-2 bg-white/10 hover:bg-brand rounded-lg text-white transition-colors"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(img.id)}
                                        className="p-2 bg-white/10 hover:bg-red-500 rounded-lg text-white transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-bold truncate">{img.caption || 'No caption'}</p>
                                    <p className="text-white/40 text-[10px] mt-1">{new Date(img.created_at || '').toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full theme-card p-12 text-center text-text-muted italic">Gallery is empty. Share some memories!</div>
                )}
            </div>
        </div>
    );
}
