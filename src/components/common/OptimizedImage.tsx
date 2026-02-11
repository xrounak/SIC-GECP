import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from './Skeleton';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = "w-full h-full",
    style,
    priority = false
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setHasError(true);
    }, [src]);

    return (
        <div className={`relative overflow-hidden bg-bg-surface ${className}`} style={style}>
            {/* Skeleton / Shimmer Effect */}
            <AnimatePresence>
                {!isLoaded && !hasError && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10"
                    >
                        <Skeleton className="w-full h-full" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error State */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-surface border border-border-main p-4 text-center">
                    <span className="text-text-muted text-[10px] uppercase tracking-widest font-bold">Image Unavailable</span>
                </div>
            )}

            {/* Actual Image */}
            <motion.img
                src={src}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                initial={{ opacity: 0, scale: priority ? 1 : 1.02 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : (priority ? 1 : 1.02)
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full object-cover"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
            />

            {/* Overlay styles for certain use cases can be added via children if needed */}
        </div>
    );
};

export default OptimizedImage;
