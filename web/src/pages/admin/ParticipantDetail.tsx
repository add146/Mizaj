import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/api';

export default function ParticipantDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const result = await api.getParticipantResult(id!);
            setData(result);
        } catch (error) {
            console.error('Failed to load participant:', error);
        } finally {
            setLoading(false);
        }
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

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <p className="text-text-secondary-light">Peserta tidak ditemukan</p>
            </div>
        );
    }

    const { participant, mizaj_result, answers } = data;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/participants')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-text-secondary-light">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Detail Peserta</h1>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{participant.name}</p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
                {/* Participant Info */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                            {participant.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">{participant.name}</h2>
                            <div className="flex items-center gap-4 mt-2 text-text-secondary-light">
                                <span>{participant.age} tahun</span>
                                <span>•</span>
                                <span>{participant.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            {participant.needs_interview ? (
                                <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium">Perlu Review</span>
                            ) : (
                                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">Selesai</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mizaj Result */}
                <div className="bg-gradient-to-br from-primary/5 to-green-500/5 rounded-xl border border-primary/20 p-6">
                    <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4">Hasil Screening</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-primary">{getMizajLabel(participant.result_mizaj_type)}</p>
                            <p className="text-text-secondary-light">{mizaj_result?.description || 'Tidak ada deskripsi'}</p>
                        </div>
                    </div>
                </div>

                {/* Answer Counts */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
                    <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4">Distribusi Jawaban</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(participant.answer_counts || {}).map(([type, count]) => (
                            <div key={type} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <p className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">{count as number}</p>
                                <p className="text-sm text-text-secondary-light">{getMizajLabel(type)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Answers Detail */}
                {answers && answers.length > 0 && (
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
                        <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4">Detail Jawaban</h3>
                        <div className="space-y-3">
                            {answers.map((answer: any, index: number) => (
                                <div key={answer.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <p className="text-sm text-text-main-light dark:text-text-main-dark">{answer.question_text}</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm">
                                        {getMizajLabel(answer.selected_mizaj_type)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
