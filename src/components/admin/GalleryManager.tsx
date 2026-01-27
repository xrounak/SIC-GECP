import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Trash2, Edit2, Plus, X } from 'lucide-react';
import type { GalleryImage } from '../../types';

export default function GalleryManager() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

    const [formData, setFormData] = useState({
        image_url: '',
        caption: ''
    });

    useEffect(() => {
        fetchImages();
    }, []);

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
        const { image_url, caption } = formData;

        if (editingImage) {
            const { error } = await supabase
                .from('gallery')
                .update({ image_url, caption })
                .eq('id', editingImage.id);

            if (error) alert('Error updating image');
            else {
                setEditingImage(null);
                fetchImages();
            }
        } else {
            const { error } = await supabase
                .from('gallery')
                .insert([{ image_url, caption }]);

            if (error) alert('Error adding image');
            else {
                setIsAdding(false);
                setFormData({ image_url: '', caption: '' });
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
            caption: img.caption || ''
        });
        setIsAdding(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-text-primary">Manage Gallery</h3>
                <button
                    onClick={() => {
                        setIsAdding(!isAdding);
                        setEditingImage(null);
                        setFormData({ image_url: '', caption: '' });
                    }}
                    className="theme-button flex items-center gap-2 py-2"
                >
                    {isAdding ? <X size={18} /> : <Plus size={18} />}
                    {isAdding ? 'Cancel' : 'Add Image'}
                </button>
            </div>

            {isAdding && (
                <div className="theme-card p-6 animate-in slide-in-from-top duration-300">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-2">Image URL</label>
                            <input
                                required
                                value={formData.image_url}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-2">Caption</label>
                            <input
                                value={formData.caption}
                                onChange={e => setFormData({ ...formData, caption: e.target.value })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors"
                                placeholder="What's happening in this photo?"
                            />
                        </div>

                        {formData.image_url && (
                            <div className="border border-border-main rounded-lg overflow-hidden max-w-sm">
                                <p className="bg-bg-main px-4 py-1 text-[10px] font-black uppercase text-text-muted border-b border-border-main tracking-widest">Preview</p>
                                <img src={formData.image_url} alt="Preview" className="w-full h-48 object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button type="submit" className="theme-button px-12">
                                {editingImage ? 'Update Entry' : 'Add to Gallery'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div></div>
                ) : images.length > 0 ? (
                    images.map(img => (
                        <div key={img.id} className="theme-card group relative aspect-square overflow-hidden hover:border-brand/40 transition-colors">
                            <img src={img.image_url} alt={img.caption || ''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

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
