import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import MemberCard from '../components/MemberCard';
import type { Member } from '../types';

export default function Members() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMembers() {
            try {
                const { data, error } = await supabase
                    .from('members')
                    .select('*')
                    .order('name');

                if (error) {
                    console.error('Error fetching members:', error);
                } else {
                    setMembers(data || []);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchMembers();
    }, []);

    return (
        <div className="bg-bg-main min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand via-accent to-brand-hover drop-shadow-[0_0_10px_rgba(79,70,229,0.3)]">
                        Our Team
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                        Meet the passionate individuals behind the <span className="text-text-primary font-medium">Science and Innovation Club</span>.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
                    </div>
                ) : members.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {members.map((member) => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-text-muted italic">No members found.</p>
                )}
            </div>
        </div>
    );
}
