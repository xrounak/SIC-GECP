import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import type { JoinApplication, EventRegistration } from '../types';
import EventManager from '../components/admin/EventManager';
import MemberManager from '../components/admin/MemberManager';
import GalleryManager from '../components/admin/GalleryManager';

export default function Admin() {
    const [applications, setApplications] = useState<JoinApplication[]>([]);
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'applications' | 'registrations' | 'events' | 'members' | 'gallery'>('applications');
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
        <div className="bg-bg-main min-h-screen py-24 transition-colors duration-500">
            <title>Dashboard & Club Management | SIC GEC Palamu</title>
            <meta
                name="description"
                content="Administrative control panel for managing events, members, and content for the GEC Palamu Science and Innovation Club website."
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
                    <h1 className="text-3xl font-bold text-text-primary drop-shadow-sm">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-brand/10 text-brand border border-brand/20 rounded-full text-xs font-medium animate-pulse">
                            Live Connection
                        </span>
                        <button
                            onClick={async () => {
                                await supabase.auth.signOut();
                                navigate('/login');
                            }}
                            className="text-sm text-text-secondary hover:text-brand transition-colors font-medium"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="theme-card p-6 border-l-4 border-l-brand">
                        <h3 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">Total Applications</h3>
                        <p className="text-3xl font-bold text-brand">
                            {loading ? '...' : applications.length}
                        </p>
                    </div>
                    <div className="theme-card p-6 border-l-4 border-l-accent">
                        <h3 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">Total Registrations</h3>
                        <p className="text-3xl font-bold text-accent">
                            {loading ? '...' : registrations.length}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8 overflow-x-auto custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="theme-card p-1 w-max flex gap-1" style={{ borderRadius: 'var(--radius-main)' }}>
                        <button
                            onClick={() => setActiveTab('applications')}
                            className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'applications'
                                ? 'bg-brand text-white shadow-md'
                                : 'text-text-secondary hover:text-brand hover:bg-brand/5'
                                }`}
                            style={{ borderRadius: 'calc(var(--radius-main) - 4px)' }}
                        >
                            Applications
                        </button>
                        <button
                            onClick={() => setActiveTab('registrations')}
                            className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'registrations'
                                ? 'bg-brand text-white shadow-md'
                                : 'text-text-secondary hover:text-brand hover:bg-brand/5'
                                }`}
                            style={{ borderRadius: 'calc(var(--radius-main) - 4px)' }}
                        >
                            Registrations
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'events'
                                ? 'bg-brand text-white shadow-md'
                                : 'text-text-secondary hover:text-brand hover:bg-brand/5'
                                }`}
                            style={{ borderRadius: 'calc(var(--radius-main) - 4px)' }}
                        >
                            Events
                        </button>
                        <button
                            onClick={() => setActiveTab('members')}
                            className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'members'
                                ? 'bg-brand text-white shadow-md'
                                : 'text-text-secondary hover:text-brand hover:bg-brand/5'
                                }`}
                            style={{ borderRadius: 'calc(var(--radius-main) - 4px)' }}
                        >
                            Members
                        </button>
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'gallery'
                                ? 'bg-brand text-white shadow-md'
                                : 'text-text-secondary hover:text-brand hover:bg-brand/5'
                                }`}
                            style={{ borderRadius: 'calc(var(--radius-main) - 4px)' }}
                        >
                            Gallery
                        </button>
                    </div>
                </div>

                {/* Tables Container */}
                <div className="theme-card overflow-hidden mb-12">
                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand"></div>
                        </div>
                    ) : (
                        <div className="p-1">
                            {activeTab === 'applications' && (
                                <div>
                                    <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                                        <h3 className="font-bold text-text-primary">Recent Applications</h3>
                                        <span className="text-xs text-brand font-medium tracking-widest uppercase">Live Data</span>
                                    </div>
                                    {applications.length > 0 ? (
                                        <div className="overflow-x-auto custom-scrollbar">
                                            <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap sm:whitespace-normal">
                                                <thead className="bg-bg-main/50 text-text-primary font-bold border-b border-border-main">
                                                    <tr>
                                                        <th className="px-3 sm:px-6 py-4">Date</th>
                                                        <th className="px-3 sm:px-6 py-4">Name</th>
                                                        <th className="px-3 sm:px-6 py-4">Branch / Year</th>
                                                        <th className="px-3 sm:px-6 py-4">Email</th>
                                                        <th className="px-3 sm:px-6 py-4">Skills</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {applications.map((app) => (
                                                        <tr key={app.id} className="hover:bg-white/5 transition-colors">
                                                            <td className="px-3 sm:px-6 py-4 text-text-muted">
                                                                {new Date(app.created_at).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-4 font-bold text-text-primary">{app.name}</td>
                                                            <td className="px-3 sm:px-6 py-4 text-text-secondary">{app.branch} - {app.year}</td>
                                                            <td className="px-3 sm:px-6 py-4 text-text-secondary font-mono text-[10px] sm:text-xs">{app.email}</td>
                                                            <td className="px-3 sm:px-6 py-4 text-text-secondary max-w-xs truncate" title={app.skills}>
                                                                {app.skills}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="p-16 text-center text-text-muted italic">No applications found.</div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'registrations' && (
                                <div>
                                    <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                                        <h3 className="font-bold text-text-primary">Event Registrations</h3>
                                        <span className="text-xs text-brand font-medium tracking-widest uppercase">Live Data</span>
                                    </div>
                                    {registrations.length > 0 ? (
                                        <div className="overflow-x-auto custom-scrollbar">
                                            <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap sm:whitespace-normal">
                                                <thead className="bg-bg-main/50 text-text-primary font-bold border-b border-border-main">
                                                    <tr>
                                                        <th className="px-3 sm:px-6 py-4">Event</th>
                                                        <th className="px-6 py-4">Name</th>
                                                        <th className="px-6 py-4">Email</th>
                                                        <th className="px-6 py-4">ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {registrations.map((reg: any) => (
                                                        <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                                                            <td className="px-3 sm:px-6 py-4 font-bold text-text-primary">
                                                                {reg.events?.title || 'Unknown Event'}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-4 text-text-secondary">{reg.name}</td>
                                                            <td className="px-3 sm:px-6 py-4 text-text-secondary font-mono text-[10px] sm:text-xs">{reg.email}</td>
                                                            <td className="px-3 sm:px-6 py-4 text-text-muted text-[10px] font-mono">{reg.id.slice(0, 8)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="p-16 text-center text-text-muted italic">No registrations found.</div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'events' && <div className="p-6"><EventManager /></div>}
                            {activeTab === 'members' && <div className="p-6"><MemberManager /></div>}
                            {activeTab === 'gallery' && <div className="p-6"><GalleryManager /></div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
