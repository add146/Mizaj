import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/api';

export default function QuestionEditor() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isNewQuestion = id === 'new';

    const [loading, setLoading] = useState(!isNewQuestion);
    const [saving, setSaving] = useState(false);
    const [questionText, setQuestionText] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [shuffleOptions, setShuffleOptions] = useState(true);
    const [options, setOptions] = useState([
        { mizaj_type: 'panas_lembab', text: '' },
        { mizaj_type: 'dingin_lembab', text: '' },
        { mizaj_type: 'panas_kering', text: '' },
        { mizaj_type: 'dingin_kering', text: '' },
    ]);

    const mizajLabels: Record<string, { label: string; color: string }> = {
        panas_lembab: { label: 'Panas Lembab', color: 'bg-orange-100 text-orange-700' },
        dingin_lembab: { label: 'Dingin Lembab', color: 'bg-blue-100 text-blue-700' },
        panas_kering: { label: 'Panas Kering', color: 'bg-red-100 text-red-700' },
        dingin_kering: { label: 'Dingin Kering', color: 'bg-gray-100 text-gray-700' },
    };

    useEffect(() => {
        if (!isNewQuestion && id) {
            loadQuestion(id);
        }
    }, [id, isNewQuestion]);

    const loadQuestion = async (questionId: string) => {
        try {
            const data = await api.getQuestion(questionId);
            setQuestionText(data.question_text);
            setIsActive(data.is_active);
            setShuffleOptions(data.shuffle_options);

            // Map options from API to our format
            const loadedOptions = data.options.map(opt => ({
                mizaj_type: opt.mizaj_type,
                text: opt.option_text
            }));
            setOptions(loadedOptions);
        } catch (error) {
            console.error('Failed to load question:', error);
            alert('Gagal memuat data pertanyaan');
            navigate('/admin/questions');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        if (!questionText.trim()) {
            alert('Teks pertanyaan tidak boleh kosong');
            return false;
        }

        for (const option of options) {
            if (!option.text.trim()) {
                alert(`Opsi untuk ${mizajLabels[option.mizaj_type].label} tidak boleh kosong`);
                return false;
            }
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setSaving(true);
        try {
            const questionData = {
                question_text: questionText,
                is_active: isActive,
                shuffle_options: shuffleOptions,
                options: options.map(opt => ({
                    mizaj_type: opt.mizaj_type,
                    option_text: opt.text
                }))
            };

            if (isNewQuestion) {
                await api.createQuestion(questionData);
                alert('Pertanyaan berhasil ditambahkan!');
            } else {
                await api.updateQuestion(id!, questionData);
                alert('Pertanyaan berhasil diperbarui!');
            }

            navigate('/admin/questions');
        } catch (error) {
            console.error('Failed to save question:', error);
            alert('Gagal menyimpan pertanyaan. Silakan coba lagi.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                    <p className="mt-4 text-text-secondary-light">Memuat data...</p>
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
                            onClick={() => navigate('/admin/questions')}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <span className="material-symbols-outlined text-text-secondary-light">arrow_back</span>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                                {isNewQuestion ? 'Tambah Pertanyaan Baru' : 'Edit Pertanyaan'}
                            </h1>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                {isNewQuestion ? 'Buat pertanyaan screening baru' : `Pertanyaan #${id}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin/questions')}
                            disabled={saving}
                            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-text-secondary-light hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center gap-2"
                        >
                            {saving && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* Question Settings */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-border-light dark:border-border-dark">
                        <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">help</span>
                            Teks Pertanyaan
                        </h2>
                    </div>
                    <div className="p-6">
                        <textarea
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            className="w-full h-32 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Masukkan teks pertanyaan..."
                        />
                        <div className="mt-4 flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Aktif</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={shuffleOptions}
                                    onChange={(e) => setShuffleOptions(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Acak urutan jawaban</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden">
                    <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                        <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">list</span>
                            Pilihan Jawaban
                        </h2>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">4 opsi (1 per tipe Mizaj)</p>
                    </div>
                    <div className="divide-y divide-border-light dark:divide-border-dark">
                        {options.map((option, index) => (
                            <div key={index} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${mizajLabels[option.mizaj_type].color}`}>
                                                {mizajLabels[option.mizaj_type].label}
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            value={option.text}
                                            onChange={(e) => {
                                                const newOptions = [...options];
                                                newOptions[index].text = e.target.value;
                                                setOptions(newOptions);
                                            }}
                                            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder={`Masukkan opsi untuk ${mizajLabels[option.mizaj_type].label}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preview */}
                <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-green-500/5 rounded-xl border border-primary/20">
                    <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">visibility</span>
                        Preview
                    </h3>
                    <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                        <p className="text-xl font-medium text-text-main-light dark:text-text-main-dark mb-4">
                            {questionText || 'Teks pertanyaan akan muncul di sini...'}
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors cursor-pointer">
                                    <span className="text-sm text-text-main-light dark:text-text-main-dark">
                                        {option.text || `(Opsi ${mizajLabels[option.mizaj_type].label} kosong)`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
