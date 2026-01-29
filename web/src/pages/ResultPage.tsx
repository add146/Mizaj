import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api, { type ParticipantResult } from '../lib/api';

export default function ResultPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ParticipantResult | null>(null);
    const [contact, setContact] = useState<string>('');

    useEffect(() => {
        loadContact();
        // Check if result was passed via navigation state
        if (location.state?.result) {
            setData(location.state.result);
            setLoading(false);
        } else if (id) {
            loadResult(id);
        } else {
            navigate('/');
        }
    }, [id]);

    const loadContact = async () => {
        try {
            const siteContent = await api.getSiteContent();
            if (siteContent.contact_whatsapp) {
                setContact(siteContent.contact_whatsapp);
            }
        } catch (error) {
            console.error('Failed to load contact:', error);
        }
    };

    const loadResult = async (participantId: string) => {
        try {
            const result = await api.getParticipantResult(participantId);
            setData(result);
        } catch (error) {
            console.error('Failed to load result:', error);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const getMizajConfig = (type: string) => {
        const configs: Record<string, { icon: string; color: string; bgColor: string; borderColor: string }> = {
            panas_lembab: {
                icon: 'wb_sunny',
                color: 'text-orange-500',
                bgColor: 'from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20',
                borderColor: 'border-orange-200 dark:border-orange-800/50'
            },
            dingin_lembab: {
                icon: 'water_drop',
                color: 'text-blue-500',
                bgColor: 'from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20',
                borderColor: 'border-blue-200 dark:border-blue-800/50'
            },
            panas_kering: {
                icon: 'local_fire_department',
                color: 'text-red-500',
                bgColor: 'from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20',
                borderColor: 'border-red-200 dark:border-red-800/50'
            },
            dingin_kering: {
                icon: 'ac_unit',
                color: 'text-gray-500',
                bgColor: 'from-gray-50 to-gray-100 dark:from-gray-950/30 dark:to-gray-900/20',
                borderColor: 'border-gray-200 dark:border-gray-800/50'
            }
        };
        return configs[type] || configs['panas_lembab'];
    };

    const getMizajColor = (type: string) => {
        const colors: Record<string, string> = {
            panas_lembab: 'bg-orange-100 text-orange-600',
            dingin_lembab: 'bg-blue-100 text-blue-600',
            panas_kering: 'bg-red-100 text-red-600',
            dingin_kering: 'bg-gray-100 text-gray-600'
        };
        return colors[type] || 'bg-gray-100 text-gray-600';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                    <p className="mt-4 text-text-secondary-light">Memuat hasil...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300">error</span>
                    <h2 className="mt-4 text-xl font-bold text-text-main-light">Hasil Tidak Ditemukan</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-6 py-2 rounded-lg bg-primary text-white font-medium"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    const { participant, mizaj_result } = data;
    const config = getMizajConfig(participant.result_mizaj_type);

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-display antialiased min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">spa</span>
                        </div>
                        <h1 className="text-lg font-bold leading-tight tracking-tight">Biofitra®</h1>
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
                        Halo <strong>{participant.name}</strong>, berdasarkan jawaban Anda, berikut adalah analisis mendalam mengenai tipe konstitusi tubuh (Mizaj) Anda.
                    </p>
                </div>

                {/* Hero Result Card */}
                <div className={`bg-gradient-to-br ${config.bgColor} rounded-2xl p-6 sm:p-8 border ${config.borderColor} shadow-lg`}>
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-700">
                            <span className={`material-symbols-outlined ${config.color} text-[64px]`}>{config.icon}</span>
                        </div>
                        <div className="flex flex-col gap-3 text-center sm:text-left w-full min-w-0">
                            <span className={`inline-block self-center sm:self-start bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md`}>
                                Tipe Dominan
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                                {mizaj_result.title.toUpperCase()}
                                <span className="block text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">
                                    ({mizaj_result.mizaj_type.replace('_', ' ')})
                                </span>
                            </h2>
                            <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed prose dark:prose-invert max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3" dangerouslySetInnerHTML={{ __html: mizaj_result.description }} />
                        </div>
                    </div>
                </div>

                {/* Interview Notice */}
                {participant.needs_interview && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                        <div className="flex items-center gap-3 text-yellow-700 dark:text-yellow-400">
                            <span className="material-symbols-outlined text-2xl">info</span>
                            <div>
                                <p className="font-bold">Memerlukan Konsultasi Lanjutan</p>
                                <p className="text-sm text-yellow-600 dark:text-yellow-500">
                                    Hasil screening Anda menunjukkan keseimbangan antar tipe Mizaj. Disarankan untuk konsultasi dengan praktisi untuk analisis lebih mendalam.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Characteristics Section */}
                {mizaj_result.characteristics && (
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <h3 className="text-lg font-bold">Karakteristik</h3>
                        </div>
                        <div className="text-text-secondary-light dark:text-text-secondary-dark prose dark:prose-invert max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3" dangerouslySetInnerHTML={{ __html: mizaj_result.characteristics }} />
                    </div>
                )}

                {/* Answer Distribution */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark">
                    <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">bar_chart</span>
                        Distribusi Jawaban
                    </h2>
                    <div className="space-y-3">
                        {Object.entries(participant.answer_counts).map(([type, count]) => {
                            const total = Object.values(participant.answer_counts).reduce((a: number, b: number) => a + b, 0);
                            const percentage = Math.round((count / total) * 100);

                            return (
                                <div key={type}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">
                                            {type === 'panas_lembab' ? 'Panas Lembab' :
                                                type === 'dingin_lembab' ? 'Dingin Lembab' :
                                                    type === 'panas_kering' ? 'Panas Kering' :
                                                        'Dingin Kering'}
                                        </span>
                                        <span className="text-sm text-text-secondary-light">{count} jawaban ({percentage}%)</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${getMizajColor(type).split(' ')[0]}`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recommendations Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mizaj_result.dietary_recommendations && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <span className="material-symbols-outlined">restaurant</span>
                                </div>
                                <h3 className="text-lg font-bold">Rekomendasi Pola Makan</h3>
                            </div>
                            <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark prose dark:prose-invert max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3" dangerouslySetInnerHTML={{ __html: mizaj_result.dietary_recommendations }} />
                        </div>
                    )}

                    {mizaj_result.lifestyle_recommendations && (
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <span className="material-symbols-outlined">self_improvement</span>
                                </div>
                                <h3 className="text-lg font-bold">Rekomendasi Gaya Hidup</h3>
                            </div>
                            <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark prose dark:prose-invert max-w-none break-words [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3" dangerouslySetInnerHTML={{ __html: mizaj_result.lifestyle_recommendations }} />
                        </div>
                    )}
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
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: 'Hasil Screening Mizaj Biofitra®',
                                    text: `Tipe Mizaj saya: ${mizaj_result.title}`,
                                    url: window.location.href
                                });
                            }
                        }}
                        className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition-all"
                    >
                        <span className="material-symbols-outlined">share</span>
                        Bagikan Hasil
                    </button>
                    <a
                        href={`https://wa.me/${contact || '628123456789'}?text=${encodeURIComponent(
                            `Halo, saya ingin konsultasi mengenai hasil Mizaj saya.\n\n` +
                            `Nama: ${participant.name}\n` +
                            `Usia: ${participant.age} tahun\n` +
                            `Tipe Mizaj: ${mizaj_result.title} (${mizaj_result.mizaj_type})\n\n` +
                            `Link Hasil: ${window.location.origin}/result/${participant.id}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-8 py-4 rounded-xl bg-green-500 text-white font-bold shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all"
                    >
                        <span className="material-symbols-outlined">chat</span>
                        Konsultasi
                    </a>
                </div>

                {/* Disclaimer */}
                <div className="text-center border-t border-border-light dark:border-border-dark pt-6 pb-10">
                    <p className="text-xs text-gray-400 dark:text-gray-500 max-w-3xl mx-auto">
                        <strong>Disclaimer:</strong> Hasil screening ini didasarkan pada prinsip pengobatan tradisional Unani/Mizaj dan ditujukan untuk tujuan edukasi serta pengenalan diri. Hasil ini bukan merupakan diagnosis medis profesional. Konsultasikan dengan praktisi kesehatan untuk saran medis yang akurat.
                    </p>
                </div>
            </main >
        </div >
    );
}
