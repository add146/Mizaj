import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function Settings() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const [settings, setSettings] = useState<Record<string, string>>({});

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await api.getSiteContent();
            setSettings(data);
        } catch (error) {
            console.error('Failed to load settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleImageUpload = async (key: string, file: File) => {
        setUploading(key);
        try {
            const result = await api.uploadImage(file);
            setSettings(prev => ({ ...prev, [key]: result.url }));
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Gagal mengupload gambar');
        } finally {
            setUploading(null);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const items = Object.entries(settings).map(([key, value]) => ({
                key,
                value,
                type: 'text'
            }));
            await api.updateSiteContent(items);
            alert('Pengaturan berhasil disimpan!');
        } catch (error) {
            console.error('Failed to save settings:', error);
            alert('Gagal menyimpan pengaturan.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                    <p className="mt-4 text-text-secondary-light">Memuat pengaturan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-text-secondary-light">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Pengaturan</h1>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Kelola konfigurasi aplikasi</p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                <form onSubmit={handleSave} className="space-y-6">
                    {/* Profile Settings */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
                        <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">person</span>
                            Profil Admin
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-text-main-dark mb-1">
                                    Nama Admin
                                </label>
                                <input
                                    type="text"
                                    value={settings['admin_name'] || ''}
                                    onChange={(e) => handleChange('admin_name', e.target.value)}
                                    placeholder="Nama lengkap admin"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-text-main-dark mb-1">
                                    Email Admin
                                </label>
                                <input
                                    type="email"
                                    value={settings['admin_email'] || ''}
                                    onChange={(e) => handleChange('admin_email', e.target.value)}
                                    placeholder="admin@email.com"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Branding Settings */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
                        <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">palette</span>
                            Branding
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-text-main-dark mb-1">
                                    Nama Aplikasi
                                </label>
                                <input
                                    type="text"
                                    value={settings['app_name'] || ''}
                                    onChange={(e) => handleChange('app_name', e.target.value)}
                                    placeholder="BioFITRA"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-text-main-dark mb-1">
                                    Logo Aplikasi
                                </label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium cursor-pointer hover:bg-primary/20 transition-colors">
                                            <span className="material-symbols-outlined text-xl">upload</span>
                                            {uploading === 'app_logo' ? 'Mengupload...' : 'Pilih Logo'}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleImageUpload('app_logo', file);
                                                }}
                                                disabled={uploading === 'app_logo'}
                                            />
                                        </label>
                                        {uploading === 'app_logo' && (
                                            <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
                                        )}
                                    </div>
                                    {settings['app_logo'] && (
                                        <div className="relative inline-block">
                                            <img
                                                src={settings['app_logo']}
                                                alt="App Logo"
                                                className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleChange('app_logo', '')}
                                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-text-main-dark mb-1">
                                    Deskripsi Footer
                                </label>
                                <textarea
                                    value={settings['footer_description'] || ''}
                                    onChange={(e) => handleChange('footer_description', e.target.value)}
                                    rows={3}
                                    placeholder="Platform kesehatan holistik untuk keseimbangan tubuh dan jiwa"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Settings */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6">
                        <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">contact_support</span>
                            Pengaturan Kontak
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-text-main-dark mb-1">
                                    Nomor WhatsApp Admin
                                </label>
                                <p className="text-xs text-text-secondary-light mb-2">
                                    Masukkan nomor dengan format internasional (contoh: 628123456789). Jika kosong, tombol konsultasi tidak akan muncul.
                                </p>
                                <input
                                    type="text"
                                    value={settings['contact_whatsapp'] || ''}
                                    onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                                    placeholder="628..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main-light dark:text-text-main-dark mb-1">
                                    Template Pesan WhatsApp (Opsional)
                                </label>
                                <textarea
                                    value={settings['contact_wa_message'] || ''}
                                    onChange={(e) => handleChange('contact_wa_message', e.target.value)}
                                    rows={3}
                                    placeholder="Pesan default saat membuka WhatsApp..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-primary/20"
                        >
                            {saving ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">save</span>
                                    Simpan Pengaturan
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
