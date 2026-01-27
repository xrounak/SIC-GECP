import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { sendTelegramNotification } from '../utils/telegram';

export default function Join() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        branch: '',
        year: '',
        skills: '',
        motivation: '',
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setStatus('submitting');
        setErrorMessage('');

        try {
            const { error } = await supabase
                .from('join_applications')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        branch: formData.branch,
                        year: formData.year,
                        skills: formData.skills,
                        motivation: formData.motivation,
                    }
                ]);

            if (error) throw error;

            // Send Telegram Notification
            await sendTelegramNotification(
                `📝 *New Join Application*\n\n` +
                `*Name:* ${formData.name}\n` +
                `*Email:* ${formData.email}\n` +
                `*Branch:* ${formData.branch} (${formData.year})\n` +
                `*Skills:* ${formData.skills}\n` +
                `*Motivation:* ${formData.motivation}`
            );

            setStatus('success');
            setFormData({
                name: '',
                email: '',
                branch: '',
                year: '',
                skills: '',
                motivation: '',
            });
        } catch (err: any) {
            console.error('Error submitting application:', err);
            setStatus('error');
            setErrorMessage(err.message || 'Failed to submit application. Please try again.');
        }
    };

    return (
        <div className="bg-bg-main min-h-screen py-24 relative overflow-hidden transition-colors duration-500">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-text-primary mb-4">Join SIC</h1>
                    <p className="text-text-secondary text-lg">
                        Ready to innovate? Fill out the application below to become a member.
                    </p>
                </div>

                <div className="theme-card p-8 sm:p-12 backdrop-blur-sm">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-900/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50 shadow-sm">
                                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mb-2">Application Submitted!</h3>
                            <p className="text-text-secondary mb-8">
                                Thanks for applying. We'll review your application and get back to you soon.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="theme-button px-8 py-3 font-semibold transition-all"
                            >
                                Submit New Application
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {status === 'error' && (
                                <div className="bg-red-900/10 border border-red-500/30 text-red-200 p-4 rounded-lg text-sm mb-6" style={{ borderRadius: 'var(--radius-main)' }}>
                                    {errorMessage}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary ml-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="theme-card w-full px-4 py-3 bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand transition-all placeholder-text-muted"
                                        placeholder="John Doe"
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="theme-card w-full px-4 py-3 bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand transition-all placeholder-text-muted"
                                        placeholder="john@example.com"
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label htmlFor="branch" className="block text-sm font-medium text-text-secondary ml-1">
                                        Branch
                                    </label>
                                    <select
                                        id="branch"
                                        name="branch"
                                        required
                                        value={formData.branch}
                                        onChange={handleChange}
                                        className="theme-card w-full px-4 py-3 bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                                        disabled={status === 'submitting'}
                                    >
                                        <option value="" className="bg-bg-main">Select Branch</option>
                                        <option value="CSE" className="bg-bg-main">Computer Science</option>
                                        <option value="IT" className="bg-bg-main">Information Technology</option>
                                        <option value="ECE" className="bg-bg-main">Electronics & Communication</option>
                                        <option value="EEE" className="bg-bg-main">Electrical & Electronics</option>
                                        <option value="ME" className="bg-bg-main">Mechanical</option>
                                        <option value="other" className="bg-bg-main">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="year" className="block text-sm font-medium text-text-secondary ml-1">
                                        Year
                                    </label>
                                    <select
                                        id="year"
                                        name="year"
                                        required
                                        value={formData.year}
                                        onChange={handleChange}
                                        className="theme-card w-full px-4 py-3 bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                                        disabled={status === 'submitting'}
                                    >
                                        <option value="" className="bg-bg-main">Select Year</option>
                                        <option value="1" className="bg-bg-main">1st Year</option>
                                        <option value="2" className="bg-bg-main">2nd Year</option>
                                        <option value="3" className="bg-bg-main">3rd Year</option>
                                        <option value="4" className="bg-bg-main">4th Year</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="skills" className="block text-sm font-medium text-text-secondary ml-1">
                                    Technical Skills
                                </label>
                                <input
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    required
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="theme-card w-full px-4 py-3 bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand transition-all placeholder-text-muted"
                                    placeholder="React, Python, UI/UX, etc."
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="motivation" className="block text-sm font-medium text-text-secondary ml-1">
                                    Why do you want to join SIC?
                                </label>
                                <textarea
                                    id="motivation"
                                    name="motivation"
                                    required
                                    rows={4}
                                    value={formData.motivation}
                                    onChange={handleChange}
                                    className="theme-card w-full px-4 py-3 bg-bg-main border border-border-main text-text-primary focus:ring-2 focus:ring-brand focus:border-brand transition-all placeholder-text-muted"
                                    placeholder="Tell us about your interests and what you hope to achieve..."
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="theme-button w-full py-4 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
