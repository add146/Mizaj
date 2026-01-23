import { useNavigate } from 'react-router-dom';

export default function ResultPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-display antialiased min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">spa</span>
                        </div>
                        <h1 className="text-lg font-bold leading-tight tracking-tight">BioFITRA</h1>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">home</span>
                        Beranda
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-[1280px] mx-auto p-4 sm:p-6 lg:p-10 flex flex-col gap-8">
                {/* Title Section */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
                        Hasil Screening Mizaj Anda
                    </h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-base max-w-2xl">
                        Berdasarkan jawaban anda, berikut adalah analisis mendalam mengenai tipe konstitusi tubuh (Mizaj) anda.
                    </p>
                </div>

                {/* Hero Result Card */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 rounded-2xl p-6 sm:p-8 border border-orange-200 dark:border-orange-800/50 shadow-lg">
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-700">
                            <span className="material-symbols-outlined text-orange-500 text-[64px]">local_fire_department</span>
                        </div>
                        <div className="flex flex-col gap-3 text-center sm:text-left">
                            <span className="inline-block self-center sm:self-start bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                                Tipe Dominan
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black">
                                PANAS LEMBAB
                                <span className="block text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">(Sanguinis / Damawi)</span>
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                                Anda memiliki kecenderungan tubuh yang hangat dan lembab. Tipe ini dikenal energik, sosial, mudah bergaul, namun perlu menjaga keseimbangan cairan tubuh agar tidak berlebihan.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Characteristics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Physical Characteristics */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <h3 className="text-lg font-bold">Karakteristik Fisik</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Tubuh cenderung berisi dengan otot kuat
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Kulit hangat dan kemerahan
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Denyut nadi kuat dan cepat
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Metabolisme aktif
                            </li>
                        </ul>
                    </div>

                    {/* Mental Characteristics */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <span className="material-symbols-outlined">psychology</span>
                            </div>
                            <h3 className="text-lg font-bold">Karakteristik Mental</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Optimis dan periang
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Percaya diri dan sosial
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Mudah bergaul
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                Cenderung emosional sesaat
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Recommendations Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <span className="material-symbols-outlined">restaurant</span>
                        </div>
                        <h3 className="text-lg font-bold">Rekomendasi Pola Makan</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">thumb_up</span>
                                Dianjurkan
                            </h4>
                            <ul className="text-sm text-text-secondary-light dark:text-text-secondary-dark space-y-1">
                                <li>• Sayuran hijau segar (bayam, selada)</li>
                                <li>• Buah-buahan asam-manis (jeruk, apel)</li>
                                <li>• Kacang-kacangan</li>
                                <li>• Daging putih (ayam kampung, ikan)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">thumb_down</span>
                                Hindari
                            </h4>
                            <ul className="text-sm text-text-secondary-light dark:text-text-secondary-dark space-y-1">
                                <li>• Makanan terlalu manis</li>
                                <li>• Berlemak santan</li>
                                <li>• Daging merah berlebih</li>
                                <li>• Gorengan</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-6">
                    <button
                        onClick={() => navigate('/screening')}
                        className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all"
                    >
                        <span className="material-symbols-outlined">refresh</span>
                        Screening Ulang
                    </button>
                    <button className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition-all">
                        <span className="material-symbols-outlined">share</span>
                        Bagikan Hasil
                    </button>
                </div>

                {/* Disclaimer */}
                <div className="text-center border-t border-border-light dark:border-border-dark pt-6 pb-10">
                    <p className="text-xs text-gray-400 dark:text-gray-500 max-w-3xl mx-auto">
                        <strong>Disclaimer:</strong> Hasil screening ini didasarkan pada prinsip pengobatan tradisional Unani/Mizaj dan ditujukan untuk tujuan edukasi serta pengenalan diri. Hasil ini bukan merupakan diagnosis medis profesional. Konsultasikan dengan praktisi kesehatan untuk saran medis yang akurat.
                    </p>
                </div>
            </main>
        </div>
    );
}
