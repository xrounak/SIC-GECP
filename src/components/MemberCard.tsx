import type { Member } from '../types';

interface MemberCardProps {
    member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
    return (
        <div className="group relative bg-bg-surface rounded-2xl shadow-lg border border-border-main hover:border-brand/50 transition-all duration-300 overflow-hidden hover:shadow-[0_0_20px_rgba(79,70,229,0.2)]">
            <div className="aspect-square overflow-hidden relative">
                <img
                    src={member.image_url || 'https://via.placeholder.com/300x300?text=Member'}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-80" />
            </div>
            <div className="p-5 relative -mt-12">
                <span className="inline-block px-3 py-1 mb-3 bg-brand/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-[0_0_10px_rgba(79,70,229,0.4)]">
                    {member.domain}
                </span>
                <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">{member.name}</h3>
                <p className="text-brand font-medium text-sm">{member.role}</p>
            </div>
        </div>
    );
}
