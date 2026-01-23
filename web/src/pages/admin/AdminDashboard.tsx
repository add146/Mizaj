export default function AdminDashboard() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark flex flex-col p-4 h-full">
                <div className="flex items-center gap-2 mb-8">
                    <span className="material-symbols-outlined text-primary text-3xl">spa</span>
                    <h1 className="text-xl font-bold">BioFITRA</h1>
                </div>

                <nav className="space-y-2">
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100">
                        <span className="material-symbols-outlined">quiz</span>
                        <span className="text-sm font-medium">Soal</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100">
                        <span className="material-symbols-outlined">groups</span>
                        <span className="text-sm font-medium">Peserta</span>
                    </a>
                </nav>
            </aside>

            <main className="flex-1 h-full overflow-y-auto p-10">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold">Selamat Datang, Admin</h1>
                        <p className="text-gray-600">Here is what is happening with your participants today.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <p className="text-gray-600 text-sm font-medium">Total Peserta</p>
                            <h3 className="text-3xl font-bold mt-2">0</h3>
                        </div>
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
                            <h3 className="text-3xl font-bold mt-2">0%</h3>
                        </div>
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <p className="text-gray-600 text-sm font-medium">Pending Reviews</p>
                            <h3 className="text-3xl font-bold mt-2">0</h3>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
