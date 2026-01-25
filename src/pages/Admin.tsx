import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import type { JoinApplication, EventRegistration } from '../types';

export default function Admin() {
    const [applications, setApplications] = useState<JoinApplication[]>([]);
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'applications' | 'registrations'>('applications');
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuthAndFetch() {
            // Check Authentication
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/login');
                return;
            }

            try {
                const { data: appsData, error: appsError } = await supabase
                    .from('join_applications')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (appsError) console.error('Error fetching applications:', appsError);
                else setApplications(appsData || []);

                const { data: regsData, error: regsError } = await supabase
                    .from('event_registrations')
                    .select('*, events(title)')
                    .order('id', { ascending: false });

                if (regsError) console.error('Error fetching registrations:', regsError);
                else setRegistrations(regsData || []);

            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        }

        checkAuthAndFetch();
    }, [navigate]);

    return (
        <div className="bg-bg-main min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-green-900/20 text-green-400 border border-green-500/30 rounded-full text-sm font-medium animate-pulse">
                            Live Connection
                        </span>
                        <button
                            onClick={async () => {
                                await supabase.auth.signOut();
                                navigate('/login');
                            }}
                            className="text-sm text-text-secondary hover:text-red-400 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-bg-surface p-6 rounded-xl shadow-lg border border-border-main">
                        <h3 className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">Total Applications</h3>
                        <p className="text-3xl font-bold text-brand drop-shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                            {loading ? '...' : applications.length}
                        </p>
                    </div>
                    <div className="bg-bg-surface p-6 rounded-xl shadow-lg border border-border-main">
                        <h3 className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">Total Registrations</h3>
                        <p className="text-3xl font-bold text-accent drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                            {loading ? '...' : registrations.length}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-bg-surface p-1 rounded-xl border border-border-main w-fit mb-6">
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'applications'
                            ? 'bg-brand/20 text-brand shadow-[0_0_10px_rgba(79,70,229,0.2)]'
                            : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                            }`}
                    >
                        Join Applications
                    </button>
                    <button
                        onClick={() => setActiveTab('registrations')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'registrations'
                            ? 'bg-brand/20 text-brand shadow-[0_0_10px_rgba(79,70,229,0.2)]'
                            : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                            }`}
                    >
                        Event Registrations
                    </button>
                </div>

                {/* Tables Container */}
                <div className="bg-bg-surface rounded-xl shadow-lg border border-border-main overflow-hidden mb-8">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'applications' && (
                                <div>
                                    <div className="px-6 py-4 border-b border-border-main flex justify-between items-center bg-bg-main/30">
                                        <h3 className="font-semibold text-text-primary">Recent Applications</h3>
                                        <span className="text-xs text-text-muted">Live Data</span>
                                    </div>
                                    {applications.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-bg-main text-text-secondary font-medium border-b border-border-main">
                                                    <tr>
                                                        <th className="px-6 py-3">Date</th>
                                                        <th className="px-6 py-3">Name</th>
                                                        <th className="px-6 py-3">Branch / Year</th>
                                                        <th className="px-6 py-3">Email</th>
                                                        <th className="px-6 py-3">Skills</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-border-main">
                                                    {applications.map((app) => (
                                                        <tr key={app.id} className="hover:bg-bg-main/50 transition-colors">
                                                            <td className="px-6 py-4 text-text-muted">
                                                                {new Date(app.created_at).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 font-medium text-text-primary">{app.name}</td>
                                                            <td className="px-6 py-4 text-text-secondary">{app.branch} - {app.year}</td>
                                                            <td className="px-6 py-4 text-text-secondary">{app.email}</td>
                                                            <td className="px-6 py-4 text-text-secondary max-w-xs truncate" title={app.skills}>
                                                                {app.skills}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="p-12 text-center text-text-muted italic">No applications found.</div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'registrations' && (
                                <div>
                                    <div className="px-6 py-4 border-b border-border-main flex justify-between items-center bg-bg-main/30">
                                        <h3 className="font-semibold text-text-primary">Event Registrations</h3>
                                        <span className="text-xs text-text-muted">Live Data</span>
                                    </div>
                                    {registrations.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-bg-main text-text-secondary font-medium border-b border-border-main">
                                                    <tr>
                                                        <th className="px-6 py-3">Event</th>
                                                        <th className="px-6 py-3">Name</th>
                                                        <th className="px-6 py-3">Email</th>
                                                        <th className="px-6 py-3">ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-border-main">
                                                    {registrations.map((reg: any) => (
                                                        <tr key={reg.id} className="hover:bg-bg-main/50 transition-colors">
                                                            <td className="px-6 py-4 font-medium text-text-primary">
                                                                {reg.events?.title || 'Unknown Event'}
                                                            </td>
                                                            <td className="px-6 py-4 text-text-secondary">{reg.name}</td>
                                                            <td className="px-6 py-4 text-text-secondary">{reg.email}</td>
                                                            <td className="px-6 py-4 text-text-muted text-xs font-mono">{reg.id.slice(0, 8)}...</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="p-12 text-center text-text-muted italic">No registrations found.</div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
