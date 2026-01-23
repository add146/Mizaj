import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

interface ContentSection {
    title: string;
    fields: { key: string; label: string; type: 'text' | 'textarea' | 'image' }[];
}

const SECTIONS: ContentSection[] = [
    {
        title: 'Hero Section',
        fields: [
            { key: 'hero_badge', label: 'Badge Text', type: 'text' },
            { key: 'hero_title', label: 'Judul Utama', type: 'text' },
            { key: 'hero_subtitle', label: 'Sub Judul', type: 'textarea' },
            { key: 'hero_image', label: 'URL Gambar Hero', type: 'text' },
            { key: 'hero_cta', label: 'Teks Tombol CTA', type: 'text' },
        ]
    },
    {
        title: 'Statistik',
        fields: [
            { key: 'stat_1_value', label: 'Statistik 1 - Nilai', type: 'text' },
            { key: 'stat_1_label', label: 'Statistik 1 - Label', type: 'text' },
            { key: 'stat_2_value', label: 'Statistik 2 - Nilai', type: 'text' },
            { key: 'stat_2_label', label: 'Statistik 2 - Label', type: 'text' },
            { key: 'stat_3_value', label: 'Statistik 3 - Nilai', type: 'text' },
            { key: 'stat_3_label', label: 'Statistik 3 - Label', type: 'text' },
        ]
    },
    {
        title: 'Kartu Mizaj',
        fields: [
            { key: 'mizaj_panas_lembab_image', label: 'Gambar Panas Lembab', type: 'text' },
            { key: 'mizaj_panas_lembab_desc', label: 'Deskripsi Panas Lembab', type: 'textarea' },
            { key: 'mizaj_dingin_lembab_image', label: 'Gambar Dingin Lembab', type: 'text' },
            { key: 'mizaj_dingin_lembab_desc', label: 'Deskripsi Dingin Lembab', type: 'textarea' },
            { key: 'mizaj_panas_kering_image', label: 'Gambar Panas Kering', type: 'text' },
            { key: 'mizaj_panas_kering_desc', label: 'Deskripsi Panas Kering', type: 'textarea' },
            { key: 'mizaj_dingin_kering_image', label: 'Gambar Dingin Kering', type: 'text' },
            { key: 'mizaj_dingin_kering_desc', label: 'Deskripsi Dingin Kering', type: 'textarea' },
        ]
    },
    {
        title: 'Cara Kerja',
        fields: [
            { key: 'step_1_title', label: 'Langkah 1 - Judul', type: 'text' },
            { key: 'step_1_desc', label: 'Langkah 1 - Deskripsi', type: 'textarea' },
            { key: 'step_2_title', label: 'Langkah 2 - Judul', type: 'text' },
            { key: 'step_2_desc', label: 'Langkah 2 - Deskripsi', type: 'textarea' },
            { key: 'step_3_title', label: 'Langkah 3 - Judul', type: 'text' },
            { key: 'step_3_desc', label: 'Langkah 3 - Deskripsi', type: 'textarea' },
        ]
    },
    {
        title: 'CTA Section',
        fields: [
            { key: 'cta_title', label: 'CTA Judul', type: 'text' },
            { key: 'cta_subtitle', label: 'CTA Deskripsi', type: 'textarea' },
            { key: 'cta_button', label: 'CTA Teks Tombol', type: 'text' },
        ]
    },
    {
        title: 'Footer',
        fields: [
            { key: 'footer_description', label: 'Deskripsi Footer', type: 'textarea' },
            { key: 'footer_copyright', label: 'Teks Copyright', type: 'text' },
        ]
    },
];

export default function LandingEditor() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState<Record<string, string>>({});
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const data = await api.getSiteContent();
            setContent(data);
        } catch (error) {
            console.error('Failed to load content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setContent(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveSection = async () => {
        setSaving(true);
        try {
            const section = SECTIONS[activeSection];
            const items = section.fields.map(field => ({
                key: field.key,
                value: content[field.key] || '',
                type: field.type === 'image' ? 'image' : 'text'
            }));

            await api.updateSiteContent(items);
            alert('Berhasil disimpan!');
        } catch (error) {
            console.error('Failed to save:', error);
            alert('Gagal menyimpan. Silakan coba lagi.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                    <p className="mt-4 text-text-secondary-light">Memuat konten...</p>
                </div>
            </div>
        );
    }

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
                            <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                                Edit Halaman Utama
                            </h1>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                Kelola konten landing page
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSaveSection}
                        disabled={saving}
                        className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-lg">save</span>
                                Simpan Perubahan
                            </>
                        )}
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <div className="w-64 shrink-0">
                        <nav className="space-y-1 sticky top-24">
                            {SECTIONS.map((section, index) => (
                                <button
                                    key={section.title}
                                    onClick={() => setActiveSection(index)}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeSection === index
                                            ? 'bg-primary text-white'
                                            : 'text-text-secondary-light hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content Editor */}
                    <div className="flex-1">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
                            <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-6">
                                {SECTIONS[activeSection].title}
                            </h2>

                            <div className="space-y-6">
                                {SECTIONS[activeSection].fields.map(field => (
                                    <div key={field.key} className="space-y-2">
                                        <label className="block text-sm font-medium text-text-main-light dark:text-text-main-dark">
                                            {field.label}
                                        </label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                value={content[field.key] || ''}
                                                onChange={(e) => handleChange(field.key, e.target.value)}
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder={`Masukkan ${field.label.toLowerCase()}`}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={content[field.key] || ''}
                                                onChange={(e) => handleChange(field.key, e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder={`Masukkan ${field.label.toLowerCase()}`}
                                            />
                                        )}
                                        {field.type === 'image' && content[field.key] && (
                                            <img
                                                src={content[field.key]}
                                                alt="Preview"
                                                className="mt-2 max-h-32 rounded-lg object-cover"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
