import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import type { MizajResult } from '../../lib/api';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function MizajContent() {
    const navigate = useNavigate();
    const [mizajTypes, setMizajTypes] = useState<MizajResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [editData, setEditData] = useState<Partial<MizajResult>>({});

    // Quill settings
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link'
    ];

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
                                                <div className="bg-white dark:bg-surface-dark rounded-lg overflow-hidden">
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={editData.description || ''}
                                                        onChange={(value) => setEditData({ ...editData, description: value })}
                                                        modules={modules}
                                                        formats={formats}
                                                        className="dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Karakteristik</label>
                                                <div className="bg-white dark:bg-surface-dark rounded-lg overflow-hidden">
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={editData.characteristics || ''}
                                                        onChange={(value) => setEditData({ ...editData, characteristics: value })}
                                                        modules={modules}
                                                        formats={formats}
                                                        className="dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Rekomendasi Makanan</label>
                                                <div className="bg-white dark:bg-surface-dark rounded-lg overflow-hidden">
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={editData.dietary_recommendations || ''}
                                                        onChange={(value) => setEditData({ ...editData, dietary_recommendations: value })}
                                                        modules={modules}
                                                        formats={formats}
                                                        className="dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Rekomendasi Gaya Hidup</label>
                                                <div className="bg-white dark:bg-surface-dark rounded-lg overflow-hidden">
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={editData.lifestyle_recommendations || ''}
                                                        onChange={(value) => setEditData({ ...editData, lifestyle_recommendations: value })}
                                                        modules={modules}
                                                        formats={formats}
                                                        className="dark:text-white"
                                                    />
                                                </div>
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
                                        <div className="space-y-4 text-sm text-text-secondary-light">
                                            <div dangerouslySetInnerHTML={{ __html: mizaj.description }} className="prose dark:prose-invert max-w-none" />
                                            {mizaj.characteristics && (
                                                <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark">
                                                    <strong className="block text-text-main-light dark:text-text-main-dark mb-2">Karakteristik:</strong>
                                                    <div dangerouslySetInnerHTML={{ __html: mizaj.characteristics }} className="prose dark:prose-invert max-w-none" />
                                                </div>
                                            )}
                                            {(mizaj.dietary_recommendations || mizaj.lifestyle_recommendations) && (
                                                <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border-light dark:border-border-dark">
                                                    {mizaj.dietary_recommendations && (
                                                        <div>
                                                            <strong className="block text-text-main-light dark:text-text-main-dark mb-2">Rekomendasi Makanan:</strong>
                                                            <div dangerouslySetInnerHTML={{ __html: mizaj.dietary_recommendations }} className="prose dark:prose-invert max-w-none" />
                                                        </div>
                                                    )}
                                                    {mizaj.lifestyle_recommendations && (
                                                        <div>
                                                            <strong className="block text-text-main-light dark:text-text-main-dark mb-2">Rekomendasi Gaya Hidup:</strong>
                                                            <div dangerouslySetInnerHTML={{ __html: mizaj.lifestyle_recommendations }} className="prose dark:prose-invert max-w-none" />
                                                        </div>
                                                    )}
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
