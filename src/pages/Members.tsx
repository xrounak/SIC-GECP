import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import MemberCard from '../components/common/MemberCard';
import type { Member } from '../types';
import Skeleton from '../components/common/Skeleton';

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
        <div className="bg-bg-main min-h-screen py-24 transition-colors duration-500">
            <title>Team & Leadership | SIC GEC Palamu</title>
            <meta
                name="description"
                content="Meet the creative minds, innovators, and leadership team behind the Science and Innovation Club at Government Engineering College Palamu."
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand via-accent to-brand-hover drop-shadow-sm">
                        Our Team
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                        Meet the passionate individuals behind the <span className="text-text-primary font-medium">Science and Innovation Club</span>.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="theme-card h-[400px] flex flex-col">
                                <Skeleton className="aspect-square w-full" />
                                <div className="p-5 flex-1 space-y-3">
                                    <Skeleton className="h-6 w-1/2" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/3" />
                                </div>
                            </div>
                        ))}
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
