import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/members', label: 'Members' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/join', label: 'Join' },
    { path: '/admin', label: 'Admin' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed w-full z-50 top-0 start-0 border-b transition-all duration-300 ${scrolled || isOpen
                    ? 'bg-bg-surface border-border-main'
                    : 'bg-transparent border-transparent'
                    }`}
                style={{
                    boxShadow: (scrolled || isOpen) ? 'var(--shadow-main)' : 'none',
                    backdropFilter: (scrolled || isOpen) ? 'var(--backdrop-blur, none)' : 'none',
                    borderWidth: (scrolled || isOpen) ? 'var(--border-width)' : '0px'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20 transition-all duration-300">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 group relative z-50">
                            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-brand transition-colors duration-300 drop-shadow-sm">SIC</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 transition-all duration-300 relative group overflow-hidden ${location.pathname === link.path
                                        ? 'text-brand'
                                        : 'text-text-secondary hover:text-brand'
                                        }`}
                                    style={{ borderRadius: 'var(--radius-main)' }}
                                >
                                    <span className="relative z-10">{link.label}</span>
                                    {/* Active/Hover Glow Indicator */}
                                    <span
                                        className={`absolute inset-0 bg-brand opacity-10 transition-transform duration-300 ${location.pathname === link.path ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}
                                        style={{ borderRadius: 'var(--radius-main)' }}
                                    />
                                </Link>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-brand transition-colors relative z-50 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-bg-surface/95 backdrop-blur-xl md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-6 pt-16">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={{ transitionDelay: `${index * 50}ms` }}
                            className={`text-2xl font-bold transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                } ${location.pathname === link.path
                                    ? 'text-brand text-glow'
                                    : 'text-text-secondary hover:text-accent'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Abstract background decorative elements for mobile menu */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
            </div>
        </>
    );
}
