import { Link } from 'react-router-dom';
import type { Member } from '../../types';
import OptimizedImage from './OptimizedImage';

interface MemberCardProps {
    member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
    return (
        <Link to={`/members/${member.id}`} className="group block h-full">
            <div className="theme-card h-full relative transition-all duration-300 overflow-hidden group-hover:border-brand">
                <div className="aspect-square overflow-hidden relative">
                    <OptimizedImage
                        src={member.image_url || 'https://via.placeholder.com/300x300?text=Member'}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                        style={{ borderRadius: 'var(--radius-main)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-5 relative -mt-12">
                    <span className="theme-badge mb-3 shadow-glow">
                        {member.domain}
                    </span>
                    <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-brand transition-colors">{member.name}</h3>
                    <p className="text-text-secondary font-medium text-sm">{member.role}</p>

                    <div className="mt-4 pt-4 border-t border-border-main flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-bold text-brand uppercase tracking-widest">More Details</span>
                        <div className="p-1 rounded-lg bg-brand/10 text-brand border border-brand/20">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
