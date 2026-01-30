import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function AdminModal({ isOpen, onClose, title, children }: AdminModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content Wrapper - Strictly viewport relative */}
                    <div className="fixed inset-0 flex justify-center p-2 sm:p-4 pointer-events-none items-start sm:items-center pt-2 sm:pt-4 overflow-y-auto custom-scrollbar">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                            className="theme-card w-full max-w-2xl flex flex-col max-h-[calc(100vh-1rem)] sm:max-h-[90vh] overflow-hidden pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] border-brand/20 my-auto sm:my-0"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-border-main bg-bg-surface/50 flex-shrink-0">
                                <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent-soft">
                                    {title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full text-text-muted hover:text-white transition-all hover:rotate-90 duration-300"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Body - The scrollable part */}
                            <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar bg-bg-main/50 flex-1">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
