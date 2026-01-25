import { useState } from 'react';
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
        <div className="min-h-screen flex items-center justify-center bg-bg-main px-4">
            <div className="max-w-md w-full space-y-8 bg-bg-surface p-8 rounded-2xl border border-border-main shadow-2xl relative overflow-hidden">
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 rounded-full blur-[60px] pointer-events-none" />

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-text-primary">Admin Access</h2>
                    <p className="mt-2 text-text-secondary text-sm">Sign in to manage the innovation hub</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-500/50 text-red-200 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-text-secondary block mb-1">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-lg focus:ring-2 focus:ring-brand focus:border-brand text-text-primary placeholder-text-muted transition-colors"
                                placeholder="admin@sic.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-text-secondary block mb-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-lg focus:ring-2 focus:ring-brand focus:border-brand text-text-primary placeholder-text-muted transition-colors"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                    >
                        {loading ? 'Authenticating...' : 'Sign in'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-xs text-text-muted">
                        Don't have an account? Ask an existing admin or check the Supabase dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}
