import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Peserta', value: '1,234', icon: 'groups', color: 'bg-blue-100 text-blue-600' },
        { label: 'Screening Hari Ini', value: '48', icon: 'today', color: 'bg-green-100 text-green-600' },
        { label: 'Completion Rate', value: '94%', icon: 'check_circle', color: 'bg-purple-100 text-purple-600' },
        { label: 'Pending Review', value: '12', icon: 'pending_actions', color: 'bg-orange-100 text-orange-600' },
    ];

    const recentParticipants = [
        { name: 'Ahmad Fauzi', mizaj: 'Panas Lembab', date: '2 menit lalu', status: 'completed' },
        { name: 'Siti Nurhaliza', mizaj: 'Dingin Lembab', date: '15 menit lalu', status: 'completed' },
        { name: 'Budi Santoso', mizaj: 'Panas Kering', date: '1 jam lalu', status: 'needs_review' },
        { name: 'Dewi Lestari', mizaj: 'Dingin Kering', date: '2 jam lalu', status: 'completed' },
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark flex flex-col h-full">
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
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="text-sm">Dashboard</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined">quiz</span>
                            <span className="text-sm">Kelola Soal</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined">groups</span>
                            <span className="text-sm">Peserta</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="text-sm">Statistik</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined">article</span>
                            <span className="text-sm">Konten Mizaj</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-sm">Pengaturan</span>
                        </a>
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
                            onClick={() => navigate('/admin/login')}
                            className="text-text-secondary-light hover:text-red-500 transition-colors"
                        >
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Dashboard</h1>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Selamat datang kembali, Administrator!</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <span className="material-symbols-outlined text-text-secondary-light">notifications</span>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
                                <span className="material-symbols-outlined text-xl">add</span>
                                Tambah Soal
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {/* Stats Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                                        <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">{stat.value}</p>
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
                            <button className="text-sm text-primary font-medium hover:underline">Lihat Semua</button>
                        </div>
                        <div className="divide-y divide-border-light dark:divide-border-dark">
                            {recentParticipants.map((participant, index) => (
                                <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {participant.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-text-main-light dark:text-text-main-dark">{participant.name}</p>
                                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{participant.mizaj}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{participant.date}</span>
                                        {participant.status === 'completed' ? (
                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Selesai</span>
                                        ) : (
                                            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">Perlu Review</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
