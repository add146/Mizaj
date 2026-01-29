import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { type ParticipantResult } from '../../lib/api';

export default function ParticipantDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ParticipantResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadParticipant(id);
        }
    }, [id]);

    const loadParticipant = async (participantId: string) => {
        try {
            const result = await api.getParticipantResult(participantId);
            setData(result);
        } catch (error) {
            console.error('Failed to load participant:', error);
            setError('Gagal memuat data peserta');
        } finally {
            setLoading(false);
        }
    };

    const getMizajIcon = (type: string) => {
        const icons: Record<string, string> = {
            panas_lembab: 'wb_sunny',
            dingin_lembab: 'water_drop',
            panas_kering: 'local_fire_department',
            dingin_kering: 'ac_unit'
        };
        return icons[type] || 'psychology';
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
            <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                    <p className="mt-4 text-text-secondary-light">Memuat data peserta...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
                <header className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin/participants')}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <span className="material-symbols-outlined text-text-secondary-light">arrow_back</span>
                        </button>
                        <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Detail Peserta</h1>
                    </div>
                </header>
                <main className="max-w-4xl mx-auto px-6 py-8">
                    <div className="text-center py-12 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark">
                        <span className="material-symbols-outlined text-6xl text-red-300">error</span>
                        <h3 className="mt-4 text-lg font-bold text-text-main-light dark:text-text-main-dark">
                            {error || 'Data tidak ditemukan'}
                        </h3>
                        <p className="mt-2 text-text-secondary-light">Peserta dengan ID ini tidak ditemukan.</p>
                        <button
                            onClick={() => navigate('/admin/participants')}
                            className="mt-6 px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90"
                        >
                            Kembali ke Daftar Peserta
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const { participant, mizaj_result } = data;
    const formattedDate = new Date(participant.created_at * 1000).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/participants')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-text-secondary-light">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Detail Peserta</h1>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Informasi lengkap dan hasil screening</p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
                {/* Participant Info */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
                    <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">person</span>
                        Data Peserta
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-text-secondary-light mb-1">Nama Lengkap</p>
                            <p className="font-medium text-text-main-light dark:text-text-main-dark">{participant.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary-light mb-1">Usia</p>
                            <p className="font-medium text-text-main-light dark:text-text-main-dark">{participant.age} tahun</p>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary-light mb-1">Jenis Kelamin</p>
                            <p className="font-medium text-text-main-light dark:text-text-main-dark">
                                {participant.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary-light mb-1">Waktu Screening</p>
                            <p className="font-medium text-text-main-light dark:text-text-main-dark">{formattedDate}</p>
                        </div>
                    </div>
                </div>

                {/* Mizaj Result */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
                    <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">psychology</span>
                        Hasil Mizaj
                    </h2>
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getMizajColor(participant.result_mizaj_type)}`}>
                            <span className="material-symbols-outlined text-3xl">{getMizajIcon(participant.result_mizaj_type)}</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">{mizaj_result.title}</h3>
                            <p className="text-text-secondary-light">{mizaj_result.mizaj_type}</p>
                        </div>
                    </div>
                    <div className="text-text-secondary-light mb-4 prose dark:prose-invert max-w-none whitespace-pre-wrap [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3" dangerouslySetInnerHTML={{ __html: mizaj_result.description }} />

                    {mizaj_result.characteristics && (
                        <div className="mb-4 pt-4 border-t border-border-light dark:border-border-dark">
                            <h3 className="font-bold text-lg text-text-main-light dark:text-text-main-dark mb-2">Karakter Kepribadian</h3>
                            <div className="text-text-secondary-light prose dark:prose-invert max-w-none whitespace-pre-wrap [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3" dangerouslySetInnerHTML={{ __html: mizaj_result.characteristics }} />
                        </div>
                    )}

                    {participant.needs_interview && (
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                                <span className="material-symbols-outlined">warning</span>
                                <p className="font-medium">Memerlukan Wawancara Lanjutan</p>
                            </div>
                            <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-1">
                                Peserta ini memiliki jawaban yang seimbang dan memerlukan wawancara untuk menentukan tipe Mizaj yang lebih akurat.
                            </p>
                        </div>
                    )}
                </div>

                {/* Answer Distribution */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
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

                {/* Recommendations */}
                {(mizaj_result.dietary_recommendations || mizaj_result.lifestyle_recommendations) && (
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
                        <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">recommend</span>
                            Rekomendasi
                        </h2>
                        {mizaj_result.dietary_recommendations && (
                            <div className="mb-4">
                                <h3 className="font-medium text-text-main-light dark:text-text-main-dark mb-2">Karakter Tubuh</h3>
                                <div className="text-text-secondary-light prose dark:prose-invert max-w-none whitespace-pre-wrap [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3" dangerouslySetInnerHTML={{ __html: mizaj_result.dietary_recommendations }} />
                            </div>
                        )}
                        {mizaj_result.lifestyle_recommendations && (
                            <div>
                                <h3 className="font-medium text-text-main-light dark:text-text-main-dark mb-2">Gaya Hidup</h3>
                                <div className="text-text-secondary-light prose dark:prose-invert max-w-none whitespace-pre-wrap [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3" dangerouslySetInnerHTML={{ __html: mizaj_result.lifestyle_recommendations }} />
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
