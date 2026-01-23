import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            navigate('/admin');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex w-full font-display bg-background-light dark:bg-background-dark">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-green-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="material-symbols-outlined text-5xl">spa</span>
                        <h1 className="text-4xl font-black tracking-tight">BioFITRA</h1>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>
                    <p className="text-center text-white/80 max-w-md text-lg leading-relaxed">
                        Kelola pertanyaan screening, pantau peserta, dan analisis hasil Mizaj dengan dashboard admin yang powerful.
                    </p>
                    <div className="mt-12 grid grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold">10k+</div>
                            <div className="text-sm text-white/70">Peserta</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">50+</div>
                            <div className="text-sm text-white/70">Pertanyaan</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">95%</div>
                            <div className="text-sm text-white/70">Akurasi</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex flex-col w-full lg:w-1/2 justify-center px-6 py-12 lg:px-20 xl:px-24">
                <div className="w-full max-w-md mx-auto">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                        <span className="material-symbols-outlined text-primary text-4xl">spa</span>
                        <h1 className="text-2xl font-black text-text-main-light dark:text-text-main-dark">BioFITRA</h1>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-4xl font-black tracking-tight text-text-main-light dark:text-text-main-dark mb-3">
                            Selamat Datang
                        </h2>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal">
                            Masuk ke dashboard untuk mengelola BioFITRA.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-text-main-light dark:text-text-main-dark text-base font-medium" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <span className="material-symbols-outlined text-xl">mail</span>
                                </span>
                                <input
                                    className="w-full h-14 pl-12 pr-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-main-light dark:text-text-main-dark placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="admin@mizaj.com"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-text-main-light dark:text-text-main-dark text-base font-medium" htmlFor="password">
                                    Password
                                </label>
                                <a href="#" className="text-sm text-primary hover:underline">Lupa password?</a>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <span className="material-symbols-outlined text-xl">lock</span>
                                </span>
                                <input
                                    className="w-full h-14 pl-12 pr-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-main-light dark:text-text-main-dark placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 w-full h-14 flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/90 active:bg-primary/80 text-white font-bold text-lg transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transform active:scale-[0.99] disabled:opacity-70"
                        >
                            {isLoading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <>
                                    <span>Masuk ke Dashboard</span>
                                    <span className="material-symbols-outlined text-xl font-bold">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
                        >
                            ← Kembali ke halaman utama
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
