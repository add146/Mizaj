import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

interface Participant {
    id: string;
    name: string;
    age: number;
    gender: string;
    result_mizaj_type: string;
    needs_interview: boolean;
    created_at: number;
}

export default function ParticipantList() {
    const navigate = useNavigate();
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadParticipants();
    }, []);

    const loadParticipants = async () => {
        try {
            const data = await api.getParticipants();
            setParticipants(data);
        } catch (error) {
            console.error('Failed to load participants:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredParticipants = participants.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'pending') return p.needs_interview;
        return p.result_mizaj_type === filter;
    });

    const getMizajLabel = (type: string) => {
        const labels: Record<string, string> = {
            panas_lembab: 'Panas Lembab',
            dingin_lembab: 'Dingin Lembab',
            panas_kering: 'Panas Kering',
            dingin_kering: 'Dingin Kering'
        };
        return labels[type] || type;
    };

    const getMizajColor = (type: string) => {
        const colors: Record<string, string> = {
            panas_lembab: 'bg-orange-100 text-orange-700',
            dingin_lembab: 'bg-blue-100 text-blue-700',
            panas_kering: 'bg-red-100 text-red-700',
            dingin_kering: 'bg-gray-100 text-gray-700'
        };
        return colors[type] || 'bg-gray-100 text-gray-700';
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin')}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <span className="material-symbols-outlined text-text-secondary-light">arrow_back</span>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Daftar Peserta</h1>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{participants.length} peserta terdaftar</p>
                        </div>
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-text-main-light dark:text-text-main-dark"
                    >
                        <option value="all">Semua</option>
                        <option value="pending">Perlu Review</option>
                        <option value="panas_lembab">Panas Lembab</option>
                        <option value="dingin_lembab">Dingin Lembab</option>
                        <option value="panas_kering">Panas Kering</option>
                        <option value="dingin_kering">Dingin Kering</option>
                    </select>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                        <p className="mt-4 text-text-secondary-light">Memuat data peserta...</p>
                    </div>
                ) : filteredParticipants.length === 0 ? (
                    <div className="text-center py-12 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark">
                        <span className="material-symbols-outlined text-6xl text-gray-300">groups</span>
                        <h3 className="mt-4 text-lg font-bold text-text-main-light dark:text-text-main-dark">Belum Ada Peserta</h3>
                        <p className="mt-2 text-text-secondary-light">Peserta akan muncul setelah mengisi quiz.</p>
                    </div>
                ) : (
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary-light">Nama</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary-light">Usia</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary-light">Tipe Mizaj</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary-light">Tanggal</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary-light">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                {filteredParticipants.map((participant) => (
                                    <tr
                                        key={participant.id}
                                        onClick={() => navigate(`/admin/participants/${participant.id}`)}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                                    {participant.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-text-main-light dark:text-text-main-dark">{participant.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-text-secondary-light">{participant.age} th</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMizajColor(participant.result_mizaj_type)}`}>
                                                {getMizajLabel(participant.result_mizaj_type)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-secondary-light">{formatDate(participant.created_at)}</td>
                                        <td className="px-6 py-4">
                                            {participant.needs_interview ? (
                                                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">Perlu Review</span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Selesai</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
