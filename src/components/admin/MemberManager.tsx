import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Trash2, Edit2, Plus, X, User } from 'lucide-react';
import type { Member } from '../../types';

export default function MemberManager() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingMember, setEditingMember] = useState<Member | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        domain: '',
        image_url: ''
    });

    useEffect(() => {
        fetchMembers();
    }, []);

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
        const { name, role, domain, image_url } = formData;

        if (editingMember) {
            const { error } = await supabase
                .from('members')
                .update({ name, role, domain, image_url })
                .eq('id', editingMember.id);

            if (error) alert('Error updating member');
            else {
                setEditingMember(null);
                fetchMembers();
            }
        } else {
            const { error } = await supabase
                .from('members')
                .insert([{ name, role, domain, image_url }]);

            if (error) alert('Error adding member');
            else {
                setIsAdding(false);
                setFormData({ name: '', role: '', domain: '', image_url: '' });
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
            image_url: member.image_url || ''
        });
        setIsAdding(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-text-primary">Manage Members</h3>
                <button
                    onClick={() => {
                        setIsAdding(!isAdding);
                        setEditingMember(null);
                        setFormData({ name: '', role: '', domain: '', image_url: '' });
                    }}
                    className="theme-button flex items-center gap-2 py-2"
                >
                    {isAdding ? <X size={18} /> : <Plus size={18} />}
                    {isAdding ? 'Cancel' : 'Add Member'}
                </button>
            </div>

            {isAdding && (
                <div className="theme-card p-6 animate-in slide-in-from-top duration-300">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-2">Member Name</label>
                            <input
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-2">Role (e.g., President)</label>
                            <input
                                required
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-2">Domain (e.g., Management)</label>
                            <input
                                required
                                value={formData.domain}
                                onChange={e => setFormData({ ...formData, domain: e.target.value })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-secondary mb-2">Image URL</label>
                            <input
                                value={formData.image_url}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                className="w-full bg-bg-main border border-border-main rounded-lg px-4 py-2 text-text-primary focus:border-brand transition-colors"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className="theme-button px-12">
                                {editingMember ? 'Update Member' : 'Create Member'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div></div>
                ) : members.length > 0 ? (
                    members.map(member => (
                        <div key={member.id} className="theme-card p-6 flex items-start gap-4 hover:border-brand/40 transition-colors">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-bg-main flex-shrink-0 border-2 border-border-main">
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
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
