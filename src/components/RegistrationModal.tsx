import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, User, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { sendTelegramNotification } from '../utils/telegram';
import type { Event } from '../types';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
}

interface TeamMember {
    name: string;
    branch: string;
    year: string;
}

interface FormData {
    teamLeader: {
        name: string;
        branch: string;
        year: string;
        email: string;
        mobile: string;
    };
    members: TeamMember[];
}

export default function RegistrationModal({ isOpen, onClose, event }: RegistrationModalProps) {
    const [formData, setFormData] = useState<FormData>({
        teamLeader: {
            name: '',
            branch: '',
            year: '',
            email: '',
            mobile: ''
        },
        members: []
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [expandedMembers, setExpandedMembers] = useState<number[]>([]);

    const maxMembers = 4;

    // Add a new team member
    const addMember = () => {
        if (formData.members.length < maxMembers) {
            setFormData({
                ...formData,
                members: [...formData.members, { name: '', branch: '', year: '' }]
            });
            setExpandedMembers([...expandedMembers, formData.members.length]);
        }
    };

    // Remove a team member
    const removeMember = (index: number) => {
        const newMembers = formData.members.filter((_, i) => i !== index);
        setFormData({ ...formData, members: newMembers });
        setExpandedMembers(expandedMembers.filter(i => i !== index).map(i => i > index ? i - 1 : i));
    };

    // Toggle member section expansion
    const toggleMember = (index: number) => {
        if (expandedMembers.includes(index)) {
            setExpandedMembers(expandedMembers.filter(i => i !== index));
        } else {
            setExpandedMembers([...expandedMembers, index]);
        }
    };

    // Update team leader field
    const updateLeader = (field: keyof FormData['teamLeader'], value: string) => {
        setFormData({
            ...formData,
            teamLeader: { ...formData.teamLeader, [field]: value }
        });
    };

    // Update team member field
    const updateMember = (index: number, field: keyof TeamMember, value: string) => {
        const newMembers = [...formData.members];
        newMembers[index] = { ...newMembers[index], [field]: value };
        setFormData({ ...formData, members: newMembers });
    };

    // Validate form
    const validateForm = (): boolean => {
        const { teamLeader, members } = formData;

        // Validate team leader (all fields required)
        if (!teamLeader.name || !teamLeader.branch || !teamLeader.year || !teamLeader.email || !teamLeader.mobile) {
            setErrorMessage('Please fill all team leader fields');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(teamLeader.email)) {
            setErrorMessage('Please enter a valid email address');
            return false;
        }

        // Validate mobile number (10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(teamLeader.mobile)) {
            setErrorMessage('Please enter a valid 10-digit mobile number');
            return false;
        }

        // Validate team members (if any field is filled, all must be filled)
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            const hasAnyField = member.name || member.branch || member.year;
            const hasAllFields = member.name && member.branch && member.year;

            if (hasAnyField && !hasAllFields) {
                setErrorMessage(`Please complete all fields for Team Member ${i + 1} or remove them`);
                return false;
            }
        }

        return true;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setStatus('error');
            return;
        }

        setStatus('submitting');
        setErrorMessage('');

        try {
            // Prepare data for Supabase
            const registrationData: any = {
                event_id: event.id,
                team_leader_name: formData.teamLeader.name,
                team_leader_branch: formData.teamLeader.branch,
                team_leader_year: formData.teamLeader.year,
                team_leader_email: formData.teamLeader.email,
                team_leader_mobile: formData.teamLeader.mobile
            };

            // Add team members data
            formData.members.forEach((member, index) => {
                if (member.name && member.branch && member.year) {
                    const memberNum = index + 1;
                    registrationData[`member${memberNum}_name`] = member.name;
                    registrationData[`member${memberNum}_branch`] = member.branch;
                    registrationData[`member${memberNum}_year`] = member.year;
                }
            });

            // Insert to Supabase
            if (supabase) {
                const { error } = await supabase
                    .from('event_registrations')
                    .insert([registrationData]);

                if (error) throw error;
            }

            // Send Telegram notification
            let telegramMessage = `🎟️ *New Event Registration*\n\n`;
            telegramMessage += `*Event:* ${event.title}\n`;
            telegramMessage += `*Date:* ${new Date(event.date).toLocaleDateString()}\n\n`;
            telegramMessage += `👤 *TEAM LEADER:*\n`;
            telegramMessage += `Name: ${formData.teamLeader.name}\n`;
            telegramMessage += `Branch: ${formData.teamLeader.branch}\n`;
            telegramMessage += `Year: ${formData.teamLeader.year}\n`;
            telegramMessage += `Email: ${formData.teamLeader.email}\n`;
            telegramMessage += `Mobile: ${formData.teamLeader.mobile}\n`;

            const validMembers = formData.members.filter(m => m.name && m.branch && m.year);
            if (validMembers.length > 0) {
                telegramMessage += `\n👥 *TEAM MEMBERS:*\n`;
                validMembers.forEach((member, index) => {
                    telegramMessage += `${index + 1}. ${member.name} - ${member.branch} - ${member.year}\n`;
                });
            }

            await sendTelegramNotification(telegramMessage);

            setStatus('success');

            // Auto-close after 3 seconds
            setTimeout(() => {
                handleClose();
            }, 3000);

        } catch (err) {
            console.error('Registration failed:', err);
            setErrorMessage('Registration failed. Please try again.');
            setStatus('error');
        }
    };

    // Handle close
    const handleClose = () => {
        if (status === 'submitting') return; // Prevent closing while submitting

        setFormData({
            teamLeader: { name: '', branch: '', year: '', email: '', mobile: '' },
            members: []
        });
        setStatus('idle');
        setErrorMessage('');
        setExpandedMembers([]);
        onClose();
    };

    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    // Add ESC key listener
    useState(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
                    onClick={handleClose}
                >
                    {/* Centered wrapper with padding */}
                    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="theme-card w-full max-w-2xl bg-bg-surface relative my-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header - Sticky on mobile */}
                            <div className="sticky top-0 bg-bg-surface border-b border-border-main p-4 sm:p-6 flex items-start justify-between z-10">
                                <div className="flex-1 pr-2">
                                    <h2 className="text-lg sm:text-2xl font-bold text-text-primary mb-1">Event Registration</h2>
                                    <p className="text-xs sm:text-sm text-text-muted line-clamp-1">{event.title}</p>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="text-text-muted hover:text-text-primary transition-colors p-1 flex-shrink-0"
                                    disabled={status === 'submitting'}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Form - Mobile Optimized */}
                            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                                {/* Team Leader Section */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-brand flex-shrink-0" />
                                        <h3 className="text-base sm:text-lg font-semibold text-text-primary">Team Leader</h3>
                                        <span className="text-xs text-red-400">*Required</span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                        <input
                                            type="text"
                                            placeholder="Full Name *"
                                            value={formData.teamLeader.name}
                                            onChange={(e) => updateLeader('name', e.target.value)}
                                            className="theme-card w-full px-3 sm:px-4 py-3 sm:py-2.5 text-sm bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand placeholder-text-muted"
                                            style={{ borderRadius: 'var(--radius-main)' }}
                                            disabled={status === 'submitting' || status === 'success'}
                                        />

                                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                            <select
                                                value={formData.teamLeader.branch}
                                                onChange={(e) => updateLeader('branch', e.target.value)}
                                                className="theme-card w-full px-3 sm:px-4 py-3 sm:py-2.5 text-sm bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand"
                                                style={{ borderRadius: 'var(--radius-main)', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                                                disabled={status === 'submitting' || status === 'success'}
                                                required
                                            >
                                                <option value="" disabled>Branch *</option>
                                                <option value="CSE">CSE</option>
                                                <option value="EE">EE</option>
                                                <option value="ME">ME</option>
                                                <option value="CE">CE</option>
                                            </select>
                                            <select
                                                value={formData.teamLeader.year}
                                                onChange={(e) => updateLeader('year', e.target.value)}
                                                className="theme-card w-full px-3 sm:px-4 py-3 sm:py-2.5 text-sm bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand"
                                                style={{ borderRadius: 'var(--radius-main)', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                                                disabled={status === 'submitting' || status === 'success'}
                                                required
                                            >
                                                <option value="" disabled>Year *</option>
                                                <option value="1st">1st Year</option>
                                                <option value="2nd">2nd Year</option>
                                                <option value="3rd">3rd Year</option>
                                                <option value="4th">4th Year</option>
                                            </select>
                                        </div>

                                        <input
                                            type="email"
                                            placeholder="Email Address *"
                                            value={formData.teamLeader.email}
                                            onChange={(e) => updateLeader('email', e.target.value)}
                                            inputMode="email"
                                            className="theme-card w-full px-3 sm:px-4 py-3 sm:py-2.5 text-sm bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand placeholder-text-muted"
                                            style={{ borderRadius: 'var(--radius-main)' }}
                                            disabled={status === 'submitting' || status === 'success'}
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number (10 digits) *"
                                            value={formData.teamLeader.mobile}
                                            onChange={(e) => updateLeader('mobile', e.target.value)}
                                            maxLength={10}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            className="theme-card w-full px-3 sm:px-4 py-3 sm:py-2.5 text-sm bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand placeholder-text-muted"
                                            style={{ borderRadius: 'var(--radius-main)' }}
                                            disabled={status === 'submitting' || status === 'success'}
                                        />
                                    </div>
                                </div>

                                {/* Team Members Section */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                                            <h3 className="text-base sm:text-lg font-semibold text-text-primary">Team Members</h3>
                                            <span className="text-xs text-text-muted">(Optional)</span>
                                        </div>
                                        {formData.members.length < maxMembers && status !== 'success' && (
                                            <button
                                                type="button"
                                                onClick={addMember}
                                                className="px-3 py-1.5 text-xs sm:text-sm text-brand hover:text-accent transition-colors font-medium bg-brand/10 hover:bg-brand/20 rounded-lg"
                                                disabled={status === 'submitting'}
                                            >
                                                + Add Member
                                            </button>
                                        )}
                                    </div>

                                    {/* Team Members List */}
                                    <div className="space-y-3">
                                        {formData.members.map((member, index) => (
                                            <div key={index} className="border border-border-main rounded-lg overflow-hidden">
                                                {/* Member Header */}
                                                <div
                                                    className="flex items-center justify-between p-3 sm:p-3 bg-bg-main cursor-pointer hover:bg-bg-main/80 transition-colors touch-manipulation"
                                                    onClick={() => toggleMember(index)}
                                                >
                                                    <span className="text-xs sm:text-sm font-medium text-text-primary truncate pr-2">
                                                        Member {index + 1}
                                                        {member.name && ` - ${member.name}`}
                                                    </span>
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        {status !== 'success' && status !== 'submitting' && (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeMember(index);
                                                                }}
                                                                className="text-xs text-red-400 hover:text-red-300 px-2 py-1 touch-manipulation"
                                                            >
                                                                Remove
                                                            </button>
                                                        )}
                                                        {expandedMembers.includes(index) ? (
                                                            <ChevronUp className="w-4 h-4 text-text-muted" />
                                                        ) : (
                                                            <ChevronDown className="w-4 h-4 text-text-muted" />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Member Fields */}
                                                <AnimatePresence>
                                                    {expandedMembers.includes(index) && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3 bg-bg-surface/50">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Full Name"
                                                                    value={member.name}
                                                                    onChange={(e) => updateMember(index, 'name', e.target.value)}
                                                                    className="theme-card w-full px-3 sm:px-4 py-3 sm:py-2.5 text-sm bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand placeholder-text-muted"
                                                                    style={{ borderRadius: 'var(--radius-main)' }}
                                                                    disabled={status === 'submitting' || status === 'success'}
                                                                />
                                                                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                                                                    <select
                                                                        value={member.branch}
                                                                        onChange={(e) => updateMember(index, 'branch', e.target.value)}
                                                                        className="theme-card w-full px-3 sm:px-4 py-3 sm:py-2.5 text-sm bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand"
                                                                        style={{ borderRadius: 'var(--radius-main)', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                                                                        disabled={status === 'submitting' || status === 'success'}
                                                                    >
                                                                        <option value="">Branch</option>
                                                                        <option value="CSE">CSE</option>
                                                                        <option value="EE">EE</option>
                                                                        <option value="ME">ME</option>
                                                                        <option value="CE">CE</option>
                                                                    </select>
                                                                    <select
                                                                        value={member.year}
                                                                        onChange={(e) => updateMember(index, 'year', e.target.value)}
                                                                        className="theme-card w-full px-3 sm:px-4 py-3 sm:py-2.5 text-sm bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand"
                                                                        style={{ borderRadius: 'var(--radius-main)', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                                                                        disabled={status === 'submitting' || status === 'success'}
                                                                    >
                                                                        <option value="">Year</option>
                                                                        <option value="1st">1st Year</option>
                                                                        <option value="2nd">2nd Year</option>
                                                                        <option value="3rd">3rd Year</option>
                                                                        <option value="4th">4th Year</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}

                                        {formData.members.length === 0 && (
                                            <p className="text-sm text-text-muted italic text-center py-4">
                                                No team members added yet. Click "Add Member" to add team members.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Error Message */}
                                {status === 'error' && errorMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-400/10 border border-red-400/20 text-red-400 px-4 py-3 rounded-lg text-sm"
                                    >
                                        {errorMessage}
                                    </motion.div>
                                )}

                                {/* Success Message */}
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-green-400/10 border border-green-400/20 text-green-400 px-4 py-3 rounded-lg text-center"
                                    >
                                        <div className="text-4xl mb-2">✓</div>
                                        <p className="font-semibold">Registration Successful!</p>
                                        <p className="text-sm text-green-400/80 mt-1">You'll receive a confirmation email shortly.</p>
                                    </motion.div>
                                )}

                                {/* Submit Buttons - Mobile Optimized */}
                                {status !== 'success' && (
                                    <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-5">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="flex-1 py-3 sm:py-2.5 text-sm text-text-muted hover:text-text-primary font-medium transition-colors rounded-lg hover:bg-bg-main touch-manipulation"
                                            disabled={status === 'submitting'}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="theme-button flex-1 py-3 sm:py-2.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                                            disabled={status === 'submitting'}
                                        >
                                            {status === 'submitting' ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                                    <span className="hidden sm:inline">Registering...</span>
                                                    <span className="sm:hidden">Please wait...</span>
                                                </span>
                                            ) : (
                                                'Submit Registration'
                                            )}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
