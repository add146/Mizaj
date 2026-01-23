import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import type { MizajResult } from '../../lib/api';

export default function MizajContent() {
    const navigate = useNavigate();
    const [mizajTypes, setMizajTypes] = useState<MizajResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [editData, setEditData] = useState<Partial<MizajResult>>({});

    useEffect(() => {
        loadMizajTypes();
    }, []);

    const loadMizajTypes = async () => {
        try {
            const data = await api.getMizajTypes();
            setMizajTypes(data);
        } catch (error) {
            console.error('Failed to load mizaj types:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (mizaj: MizajResult) => {
        setEditing(mizaj.mizaj_type);
        setEditData(mizaj);
    };

    const handleSave = async () => {
        if (!editing) return;
        try {
            await api.updateMizaj(editing, editData);
            setMizajTypes(mizajTypes.map(m =>
                m.mizaj_type === editing ? { ...m, ...editData } : m
            ));
            setEditing(null);
            setEditData({});
        } catch (error) {
            console.error('Failed to update mizaj:', error);
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

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-text-secondary-light">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Konten Mizaj</h1>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Kelola deskripsi dan rekomendasi untuk setiap tipe Mizaj</p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                        <p className="mt-4 text-text-secondary-light">Memuat data...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {mizajTypes.map((mizaj) => (
                            <div
                                key={mizaj.mizaj_type}
                                className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getMizajColor(mizaj.mizaj_type)}`}>
                                            <span className="material-symbols-outlined text-2xl">{getMizajIcon(mizaj.mizaj_type)}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">{mizaj.title}</h3>
                                            <p className="text-sm text-text-secondary-light">{mizaj.mizaj_type}</p>
                                        </div>
                                        {editing !== mizaj.mizaj_type && (
                                            <button
                                                onClick={() => handleEdit(mizaj)}
                                                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                                Edit
                                            </button>
                                        )}
                                    </div>

                                    {editing === mizaj.mizaj_type ? (
                                        <div className="space-y-4 mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Deskripsi</label>
                                                <textarea
                                                    value={editData.description || ''}
                                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark outline-none focus:border-primary"
                                                    rows={3}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Karakteristik</label>
                                                <textarea
                                                    value={editData.characteristics || ''}
                                                    onChange={(e) => setEditData({ ...editData, characteristics: e.target.value })}
                                                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark outline-none focus:border-primary"
                                                    rows={3}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Rekomendasi Makanan</label>
                                                <textarea
                                                    value={editData.dietary_recommendations || ''}
                                                    onChange={(e) => setEditData({ ...editData, dietary_recommendations: e.target.value })}
                                                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark outline-none focus:border-primary"
                                                    rows={3}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Rekomendasi Gaya Hidup</label>
                                                <textarea
                                                    value={editData.lifestyle_recommendations || ''}
                                                    onChange={(e) => setEditData({ ...editData, lifestyle_recommendations: e.target.value })}
                                                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark outline-none focus:border-primary"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="flex gap-3 mt-4">
                                                <button
                                                    onClick={handleSave}
                                                    className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90"
                                                >
                                                    Simpan
                                                </button>
                                                <button
                                                    onClick={() => { setEditing(null); setEditData({}); }}
                                                    className="px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                                                >
                                                    Batal
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3 text-sm text-text-secondary-light">
                                            <p>{mizaj.description}</p>
                                            {mizaj.characteristics && (
                                                <div className="mt-4">
                                                    <strong className="text-text-main-light dark:text-text-main-dark">Karakteristik:</strong>
                                                    <p>{mizaj.characteristics}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
