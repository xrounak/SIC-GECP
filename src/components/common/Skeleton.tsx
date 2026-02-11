import React from 'react';

interface SkeletonProps {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
    return (
        <div
            className={`
                relative overflow-hidden bg-bg-surface/50
                before:absolute before:inset-0
                before:-translate-x-full
                before:animate-[shimmer_2s_infinite]
                before:bg-gradient-to-r
                before:from-transparent before:via-white/10 before:to-transparent
                ${className}
            `}
            style={{ borderRadius: 'var(--radius-main)' }}
        />
    );
};

export default Skeleton;
