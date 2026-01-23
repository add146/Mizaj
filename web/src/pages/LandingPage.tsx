import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

// Default content values
const DEFAULTS: Record<string, string> = {
    hero_badge: 'Based on Traditional Tibb Nabawi',
    hero_title: 'Kenali Karakter Tubuh Anda Sesuai Fitrah Sejak Lahir',
    hero_subtitle: 'Temukan keseimbangan kesehatan Anda melalui metode screening Mizaj tradisional yang akurat dan terpercaya. Pahami diri Anda untuk hidup lebih sehat.',
    hero_image: '/hero_nature_herbs_1769161155289.png',
    hero_cta: 'MULAI SCREENING',
    stat_1_value: '4+',
    stat_1_label: 'Tipe Mizaj Utama',
    stat_2_value: '10k+',
    stat_2_label: 'Pengguna Terdaftar',
    stat_3_value: '95%',
    stat_3_label: 'Akurasi Screening',
    mizaj_panas_lembab_image: '/panas_lembab_tropical_1769161184075.png',
    mizaj_panas_lembab_desc: 'Karakter sanguinis yang energik, ceria, dan sosial. Cenderung memiliki tubuh yang hangat dan kulit kemerahan.',
    mizaj_dingin_lembab_image: '/dingin_lembab_misty_1769161212298.png',
    mizaj_dingin_lembab_desc: 'Karakter phlegmatis yang tenang, sabar, dan santai. Cenderung memiliki kulit pucat dan metabolisme lambat.',
    mizaj_panas_kering_image: '/panas_kering_desert_1769161245061.png',
    mizaj_panas_kering_desc: 'Karakter koleris yang tegas, pemimpin, dan berambisi. Cenderung memiliki tubuh kurus berotot dan aktif.',
    mizaj_dingin_kering_image: '/dingin_kering_mountain_1769161269707.png',
    mizaj_dingin_kering_desc: 'Karakter melankolis yang pemikir, analitis, dan detail. Cenderung introspektif dan menyukai kesendirian.',
    cta_title: 'Siap Mengetahui Keseimbangan Tubuh Anda?',
    cta_subtitle: 'Jangan biarkan ketidakseimbangan tubuh mengganggu aktivitas Anda. Mulai screening sekarang dan dapatkan solusi kesehatan yang tepat.',
    cta_button: 'MULAI SCREENING',
};

export default function LandingPage() {
    const navigate = useNavigate();
    const [content, setContent] = useState<Record<string, string>>(DEFAULTS);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const data = await api.getSiteContent();
            // Merge with defaults - only use API values if non-empty
            setContent(prev => {
                const merged = { ...prev };
                for (const [key, value] of Object.entries(data)) {
                    if (value && value.trim() !== '') {
                        merged[key] = value;
                    }
                }
                return merged;
            });
        } catch (error) {
            console.log('Using default content');
        }
    };

    // Helper to get content with fallback
    const c = (key: string) => content[key] || DEFAULTS[key] || '';

    return (
        <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-display antialiased">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-6 py-4 lg:px-20">
                <div className="flex items-center gap-3 text-primary">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-2xl">spa</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">BioFITRA</h2>
                </div>
                <div className="hidden md:flex flex-1 justify-center gap-8">
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Home</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Tentang Mizaj</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Kontak</a>
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href={`https://wa.me/${c('contact_whatsapp') || '628123456789'}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-10 items-center justify-center gap-2 rounded-lg bg-green-500 px-6 text-sm font-bold text-white shadow-sm hover:bg-green-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">chat</span>
                        Konsultasi
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative flex flex-col justify-center px-6 py-12 lg:px-20 lg:py-24">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
                    {/* Text Content */}
                    <div className="flex flex-1 flex-col gap-6 lg:max-w-xl">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            <span>{c('hero_badge')}</span>
                        </div>
                        <h1 className="text-4xl font-black leading-tight tracking-tight text-text-main-light dark:text-text-main-dark sm:text-5xl lg:text-6xl">
                            {c('hero_title').split('Fitrah')[0]}<span className="text-primary">Fitrah</span>{c('hero_title').split('Fitrah')[1] || ' Sejak Lahir'}
                        </h1>
                        <p className="text-lg font-normal leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                            {c('hero_subtitle')}
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <button
                                onClick={() => navigate('/screening')}
                                className="flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 hover:translate-y-[-2px] transition-all"
                            >
                                {c('hero_cta')}
                            </button>
                            <button className="flex h-12 items-center justify-center gap-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-6 text-base font-bold text-text-main-light dark:text-text-main-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <span className="material-symbols-outlined text-primary">play_circle</span>
                                Pelajari Lebih Lanjut
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex flex-1 items-center justify-center">
                        <div className="relative w-full aspect-square max-w-[500px] overflow-hidden rounded-2xl bg-gradient-to-tr from-green-50 to-primary/10 dark:from-green-950/30 dark:to-primary/20 p-8">
                            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
                            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl"></div>
                            <div
                                className="h-full w-full rounded-xl bg-center bg-cover shadow-2xl"
                                style={{ backgroundImage: `url('${c('hero_image')}')` }}
                            ></div>
                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-xl border border-border-light dark:border-border-dark">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <span className="material-symbols-outlined">health_and_safety</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark">100% Alami</p>
                                    <p className="text-xs text-text-secondary-light">Pendekatan Holistik</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <div className="w-full border-y border-border-light dark:border-border-dark bg-white dark:bg-surface-dark py-8">
                <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 px-6 text-center lg:justify-evenly lg:px-20">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-primary">{c('stat_1_value')}</span>
                        <span className="text-sm text-text-secondary-light">{c('stat_1_label')}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-primary">{c('stat_2_value')}</span>
                        <span className="text-sm text-text-secondary-light">{c('stat_2_label')}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-primary">{c('stat_3_value')}</span>
                        <span className="text-sm text-text-secondary-light">{c('stat_3_label')}</span>
                    </div>
                </div>
            </div>

            {/* Mizaj Types Section */}
            <section className="bg-background-light dark:bg-background-dark py-16 px-6 lg:px-20">
                <div className="mx-auto flex max-w-7xl flex-col gap-12">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <h2 className="text-3xl font-bold leading-tight text-text-main-light dark:text-text-main-dark sm:text-4xl">
                            4 Tipe <span className="text-primary">Mizaj</span>
                        </h2>
                        <p className="max-w-2xl text-lg text-text-secondary-light dark:text-text-secondary-dark">
                            Kenali klasifikasi karakter tubuh dasar manusia untuk memahami kebutuhan fisik dan mental Anda.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Card 1: Panas Lembab */}
                        <div className="group flex flex-col overflow-hidden rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                            <div className="h-48 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/panas_lembab_tropical_1769161184075.png')" }}></div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                                    <span className="material-symbols-outlined">wb_sunny</span>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-text-main-light dark:text-text-main-dark">Panas Lembab</h3>
                                <p className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                                    Karakter sanguinis yang energik, ceria, dan sosial. Cenderung memiliki tubuh yang hangat dan kulit kemerahan.
                                </p>
                            </div>
                        </div>
                        {/* Card 2: Dingin Lembab */}
                        <div className="group flex flex-col overflow-hidden rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                            <div className="h-48 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/dingin_lembab_misty_1769161212298.png')" }}></div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined">water_drop</span>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-text-main-light dark:text-text-main-dark">Dingin Lembab</h3>
                                <p className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                                    Karakter phlegmatis yang tenang, sabar, dan santai. Cenderung memiliki kulit pucat dan metabolisme lambat.
                                </p>
                            </div>
                        </div>
                        {/* Card 3: Panas Kering */}
                        <div className="group flex flex-col overflow-hidden rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                            <div className="h-48 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/panas_kering_desert_1769161245061.png')" }}></div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                    <span className="material-symbols-outlined">local_fire_department</span>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-text-main-light dark:text-text-main-dark">Panas Kering</h3>
                                <p className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                                    Karakter koleris yang tegas, pemimpin, dan berambisi. Cenderung memiliki tubuh kurus berotot dan aktif.
                                </p>
                            </div>
                        </div>
                        {/* Card 4: Dingin Kering */}
                        <div className="group flex flex-col overflow-hidden rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                            <div className="h-48 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/dingin_kering_mountain_1769161269707.png')" }}></div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                                    <span className="material-symbols-outlined">ac_unit</span>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-text-main-light dark:text-text-main-dark">Dingin Kering</h3>
                                <p className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                                    Karakter melankolis yang pemikir, analitis, dan detail. Cenderung introspektif dan menyukai kesendirian.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="bg-surface-light dark:bg-surface-dark py-20 px-6 lg:px-20">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
                    <div className="flex flex-col gap-4 text-center">
                        <h2 className="text-3xl font-bold text-text-main-light dark:text-text-main-dark sm:text-4xl">Cara Kerja BioFITRA</h2>
                        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">Tiga langkah mudah menuju kesehatan alami sesuai fitrah.</p>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="relative flex flex-col items-center gap-4 rounded-2xl bg-background-light dark:bg-background-dark p-8 text-center border border-border-light dark:border-border-dark">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-3xl">assignment</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">1. Isi Kuesioner</h3>
                            <p className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                                Jawab pertanyaan sederhana tentang kondisi fisik, kebiasaan, dan preferensi Anda sehari-hari.
                            </p>
                        </div>
                        <div className="relative flex flex-col items-center gap-4 rounded-2xl bg-background-light dark:bg-background-dark p-8 text-center border border-border-light dark:border-border-dark">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-3xl">psychology</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">2. Analisis Instan</h3>
                            <p className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                                Sistem cerdas kami akan menganalisis jawaban Anda untuk menentukan tipe dominan Mizaj Anda.
                            </p>
                        </div>
                        <div className="relative flex flex-col items-center gap-4 rounded-2xl bg-background-light dark:bg-background-dark p-8 text-center border border-border-light dark:border-border-dark">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-3xl">eco</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">3. Solusi Herbal</h3>
                            <p className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                                Dapatkan rekomendasi herbal, pola makan, dan gaya hidup yang dirancang khusus untuk Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden py-24 px-6 lg:px-20">
                <div className="absolute inset-0 bg-primary/5"></div>
                <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center relative z-10">
                    <h2 className="text-4xl font-black leading-tight text-text-main-light dark:text-text-main-dark sm:text-5xl">
                        Siap Mengetahui Keseimbangan Tubuh Anda?
                    </h2>
                    <p className="max-w-2xl text-lg text-text-secondary-light dark:text-text-secondary-dark">
                        Jangan biarkan ketidakseimbangan tubuh mengganggu aktivitas Anda. Mulai screening sekarang dan dapatkan solusi kesehatan yang tepat.
                    </p>
                    <button
                        onClick={() => navigate('/screening')}
                        className="flex h-14 min-w-[200px] items-center justify-center rounded-xl bg-primary px-8 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-transform hover:scale-105 hover:bg-primary/90"
                    >
                        MULAI SCREENING
                    </button>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-4">
                        *Gratis untuk pendaftaran pertama
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-12 px-6 lg:px-20">
                <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined">spa</span>
                            <span className="text-xl font-bold text-text-main-light dark:text-text-main-dark">BioFITRA</span>
                        </div>
                        <p className="max-w-xs text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            Platform kesehatan holistik berbasis Mizaj untuk keseimbangan tubuh dan jiwa sesuai fitrah.
                        </p>
                    </div>
                    <div className="flex gap-12 sm:gap-20">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-text-main-light dark:text-text-main-dark">Menu</h4>
                            <a className="text-sm text-text-secondary-light hover:text-primary transition-colors" href="#">Beranda</a>
                            <a className="text-sm text-text-secondary-light hover:text-primary transition-colors" href="#">Tentang Kami</a>
                            <a className="text-sm text-text-secondary-light hover:text-primary transition-colors" href="#">Blog Kesehatan</a>
                            <a className="text-sm text-text-secondary-light hover:text-primary transition-colors" href="#">Kontak</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-text-main-light dark:text-text-main-dark">Legal</h4>
                            <a className="text-sm text-text-secondary-light hover:text-primary transition-colors" href="#">Kebijakan Privasi</a>
                            <a className="text-sm text-text-secondary-light hover:text-primary transition-colors" href="#">Syarat & Ketentuan</a>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between border-t border-border-light dark:border-border-dark pt-8 sm:flex-row">
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        © 2024 BioFITRA. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
