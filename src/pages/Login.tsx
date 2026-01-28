import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!supabase) {
            setError('Supabase client is not initialized.');
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate('/admin');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-main px-4 transition-colors duration-500">
            <Helmet>
                <title>Student/Admin Login | SIC GEC Palamu Access</title>
                <meta
                    name="description"
                    content="Secure portal for members and administrators of the Science and Innovation Club, Government Engineering College Palamu."
                />
            </Helmet>
            <div className="theme-card max-w-md w-full space-y-8 p-8 relative overflow-hidden backdrop-blur-sm">
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="text-center relative z-10">
                    <h2 className="text-3xl font-bold text-text-primary">Admin Access</h2>
                    <p className="mt-2 text-text-secondary text-sm">Sign in to manage the innovation hub</p>
                </div>

                <form className="mt-8 space-y-6 relative z-10" onSubmit={handleLogin}>
                    {error && (
                        <div className="p-3 bg-red-900/10 border border-red-500/30 text-red-200 text-sm rounded-lg" style={{ borderRadius: 'var(--radius-main)' }}>
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-medium text-text-secondary block ml-1">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="theme-card w-full px-4 py-3 bg-bg-main border border-border-main text-text-primary placeholder-text-muted transition-all focus:ring-2 focus:ring-brand focus:border-brand"
                                style={{ borderRadius: 'var(--radius-main)' }}
                                placeholder="admin@sic.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="password" className="text-sm font-medium text-text-secondary block ml-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="theme-card w-full px-4 py-3 bg-bg-main border border-border-main text-text-primary placeholder-text-muted transition-all focus:ring-2 focus:ring-brand focus:border-brand"
                                style={{ borderRadius: 'var(--radius-main)' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="theme-button w-full flex justify-center py-3 px-4 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Authenticating...' : 'Sign in'}
                    </button>
                </form>

                <div className="text-center mt-4 relative z-10">
                    <p className="text-xs text-text-muted">
                        Don't have an account? Ask an existing admin or check the Supabase dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}
