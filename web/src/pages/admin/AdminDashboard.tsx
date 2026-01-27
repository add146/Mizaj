import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../lib/api';

interface Participant {
    id: string;
    name: string;
    age: number;
    gender: string;
    result_mizaj_type: string;
    needs_interview: boolean;
    created_at: number;
    mizaj_title?: string;
}

interface Stats {
    total: number;
    today: number;
    completionRate: number;
    pendingReview: number;
}

export default function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, today: 0, completionRate: 0, pendingReview: 0 });
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await api.getParticipants();
            setParticipants(data);

            // Calculate stats
            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            // DB returns seconds, JS needs milliseconds
            const todayCount = data.filter((p: Participant) => (p.created_at * 1000) >= startOfDay).length;
            const pendingCount = data.filter((p: Participant) => p.needs_interview).length;

            setStats({
                total: data.length,
                today: todayCount,
                completionRate: data.length > 0 ? Math.round(((data.length - pendingCount) / data.length) * 100) : 0,
                pendingReview: pendingCount
            });
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        api.logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/admin' },
        { id: 'landing', label: 'Halaman Utama', icon: 'web', path: '/admin/landing' },
        { id: 'questions', label: 'Kelola Soal', icon: 'quiz', path: '/admin/questions' },
        { id: 'participants', label: 'Peserta', icon: 'groups', path: '/admin/participants' },
        { id: 'mizaj', label: 'Konten Mizaj', icon: 'article', path: '/admin/mizaj' },
        { id: 'settings', label: 'Pengaturan', icon: 'settings', path: '/admin/settings' },
    ];

    const statCards = [
        { label: 'Total Peserta', value: stats.total.toString(), icon: 'groups', color: 'bg-blue-100 text-blue-600' },
        { label: 'Screening Hari Ini', value: stats.today.toString(), icon: 'today', color: 'bg-green-100 text-green-600' },
        { label: 'Completion Rate', value: `${stats.completionRate}%`, icon: 'check_circle', color: 'bg-purple-100 text-purple-600' },
        { label: 'Pending Review', value: stats.pendingReview.toString(), icon: 'pending_actions', color: 'bg-orange-100 text-orange-600' },
    ];

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000 * 1000);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        if (minutes < 60) return `${minutes} menit lalu`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} jam lalu`;
        return date.toLocaleDateString('id-ID');
    };

    const getMizajLabel = (type: string) => {
        const labels: Record<string, string> = {
            panas_lembab: 'Panas Lembab',
            dingin_lembab: 'Dingin Lembab',
            panas_kering: 'Panas Kering',
            dingin_kering: 'Dingin Kering'
        };
        return labels[type] || type;
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static w-64 flex-shrink-0 border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark flex flex-col h-full z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-border-light dark:border-border-dark">
                    <span className="material-symbols-outlined text-primary text-3xl">spa</span>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">BioFITRA</h1>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Admin Console</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <div className="flex flex-col gap-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveMenu(item.id);
                                    navigate(item.path);
                                    setSidebarOpen(false);
                                }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left w-full ${activeMenu === item.id || location.pathname === item.path
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="text-sm">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-border-light dark:border-border-dark">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">person</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark">Administrator</p>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">admin@mizaj.com</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-text-secondary-light hover:text-red-500 transition-colors"
                            title="Logout"
                        >
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-4 md:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-text-secondary-light">menu</span>
                            </button>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-text-main-light dark:text-text-main-dark">Dashboard</h1>
                                <p className="hidden sm:block text-sm text-text-secondary-light dark:text-text-secondary-dark">Selamat datang kembali, Administrator!</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-text-secondary-light hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                title="Lihat Website"
                            >
                                <span className="material-symbols-outlined">visibility</span>
                                <span className="hidden md:inline text-sm">Lihat Website</span>
                            </button>
                            <button
                                onClick={() => navigate('/admin/questions/new')}
                                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                            >
                                <span className="material-symbols-outlined text-xl">add</span>
                                <span className="hidden sm:inline">Tambah Soal</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8">
                    {/* Stats Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((stat, index) => (
                            <div key={index} className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                                        <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                                            {loading ? '...' : stat.value}
                                        </p>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{stat.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Recent Participants */}
                    <section className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-border-light dark:border-border-dark">
                            <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Peserta Terbaru</h2>
                            <button
                                onClick={() => navigate('/admin/participants')}
                                className="text-sm text-primary font-medium hover:underline"
                            >
                                Lihat Semua
                            </button>
                        </div>
                        {loading ? (
                            <div className="p-8 text-center text-text-secondary-light">
                                <span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span>
                                <p className="mt-2">Memuat data...</p>
                            </div>
                        ) : participants.length === 0 ? (
                            <div className="p-8 text-center text-text-secondary-light">
                                <span className="material-symbols-outlined text-4xl">inbox</span>
                                <p className="mt-2">Belum ada peserta</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border-light dark:divide-border-dark">
                                {participants.slice(0, 5).map((participant) => (
                                    <div
                                        key={participant.id}
                                        onClick={() => navigate(`/admin/participants/${participant.id}`)}
                                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 md:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer gap-3 sm:gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {participant.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-text-main-light dark:text-text-main-dark">{participant.name}</p>
                                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                                    {getMizajLabel(participant.result_mizaj_type)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:gap-4 ml-14 sm:ml-0">
                                            <span className="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                                {formatDate(participant.created_at)}
                                            </span>
                                            {participant.needs_interview ? (
                                                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">Perlu Review</span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Selesai</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
