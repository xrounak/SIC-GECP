import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Trash2, Edit2, Plus, User } from 'lucide-react';
import type { Member } from '../../types';

import AdminModal from './AdminModal';
import OptimizedImage from '../common/OptimizedImage';

export default function MemberManager() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<Member | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        domain: '',
        image_url: '',
        bio_md: ''
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const resetForm = () => {
        setFormData({ name: '', role: '', domain: '', image_url: '', bio_md: '' });
        setEditingMember(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    async function fetchMembers() {
        setLoading(true);
        const { data, error } = await supabase
            .from('members')
            .select('*')
            .order('name');

        if (error) console.error('Error fetching members:', error);
        else setMembers(data || []);
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { name, role, domain, image_url, bio_md } = formData;

        if (editingMember) {
            const { error } = await supabase
                .from('members')
                .update({ name, role, domain, image_url, bio_md })
                .eq('id', editingMember.id);

            if (error) alert('Error updating member');
            else {
                handleCloseModal();
                fetchMembers();
            }
        } else {
            const { error } = await supabase
                .from('members')
                .insert([{ name, role, domain, image_url, bio_md }]);

            if (error) alert('Error adding member');
            else {
                handleCloseModal();
                fetchMembers();
            }
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this member?')) return;

        const { error } = await supabase
            .from('members')
            .delete()
            .eq('id', id);

        if (error) alert('Error deleting member');
        else fetchMembers();
    }

    const openEdit = (member: Member) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            role: member.role,
            domain: member.domain,
            image_url: member.image_url || '',
            bio_md: member.bio_md || ''
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-bg-surface/30 p-4 rounded-2xl border border-border-main backdrop-blur-sm">
                <div>
                    <h3 className="text-xl font-bold text-text-primary">Manage Members</h3>
                    <p className="text-xs text-text-muted mt-1">Add or update club member profiles</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="theme-button flex items-center gap-2 py-2.5 px-6 shadow-lg shadow-brand/10"
                >
                    <Plus size={18} />
                    <span>Add Member</span>
                </button>
            </div>

            <AdminModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingMember ? 'Edit Member Profile' : 'Add New Member'}
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Member Name</label>
                        <input
                            required
                            placeholder="e.g. Rounak Kumar"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Role</label>
                        <input
                            required
                            placeholder="e.g. Technical Head"
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Domain</label>
                        <input
                            required
                            placeholder="e.g. Web Developer"
                            value={formData.domain}
                            onChange={e => setFormData({ ...formData, domain: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Image URL</label>
                        <input
                            placeholder="https://your-image-url.com"
                            value={formData.image_url}
                            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand transition-all"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1 text-brand">Member Biography (Markdown)</label>
                        <textarea
                            placeholder="Describe the member's achievements, skills, and background..."
                            value={formData.bio_md}
                            onChange={e => setFormData({ ...formData, bio_md: e.target.value })}
                            className="theme-card w-full bg-bg-main border border-border-main rounded-xl px-4 py-3 text-text-primary focus:border-brand transition-all font-mono text-sm h-32"
                        />
                    </div>
                    {formData.image_url && (
                        <div className="col-span-1 md:col-span-2 flex justify-center py-4 bg-bg-surface/20 rounded-2xl border border-dashed border-border-main">
                            <div className="text-center">
                                <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">Avatar Preview</p>
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand mx-auto shadow-lg">
                                    <OptimizedImage
                                        src={formData.image_url}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        priority={true}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="md:col-span-2 flex justify-end pt-2">
                        <button type="submit" className="theme-button w-full sm:w-auto px-12 py-3 font-bold shadow-xl shadow-brand/20">
                            {editingMember ? 'Update Profile' : 'Add Member'}
                        </button>
                    </div>
                </form>
            </AdminModal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div></div>
                ) : members.length > 0 ? (
                    members.map(member => (
                        <div key={member.id} className="theme-card p-6 flex items-start gap-4 hover:border-brand/40 transition-colors">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-bg-main flex-shrink-0 border-2 border-border-main">
                                {member.image_url ? (
                                    <OptimizedImage src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-text-muted"><User size={32} /></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-bold text-text-primary truncate">{member.name}</h4>
                                <p className="text-sm text-brand font-medium truncate">{member.role}</p>
                                <p className="text-xs text-text-muted mt-1 truncate">{member.domain}</p>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => openEdit(member)}
                                        className="p-1.5 hover:bg-brand/10 text-text-secondary hover:text-brand rounded-lg transition-colors"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        className="p-1.5 hover:bg-red-500/10 text-text-secondary hover:text-red-500 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full theme-card p-12 text-center text-text-muted italic">No members found.</div>
                )}
            </div>
        </div>
    );
}
