import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuestionEditor() {
    const navigate = useNavigate();
    const [questionText, setQuestionText] = useState('Bagaimana kondisi kulit Anda secara umum sepanjang tahun?');
    const [options, setOptions] = useState([
        { mizaj_type: 'panas_lembab', text: 'Lembap, halus, dan sering terasa hangat' },
        { mizaj_type: 'dingin_lembab', text: 'Berminyak dan cenderung pucat' },
        { mizaj_type: 'panas_kering', text: 'Kering, kasar, dan sering terasa panas' },
        { mizaj_type: 'dingin_kering', text: 'Kering dan terasa dingin saat disentuh' },
    ]);

    const mizajLabels: Record<string, { label: string; color: string }> = {
        panas_lembab: { label: 'Panas Lembab', color: 'bg-orange-100 text-orange-700' },
        dingin_lembab: { label: 'Dingin Lembab', color: 'bg-blue-100 text-blue-700' },
        panas_kering: { label: 'Panas Kering', color: 'bg-red-100 text-red-700' },
        dingin_kering: { label: 'Dingin Kering', color: 'bg-gray-100 text-gray-700' },
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
                            <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Edit Pertanyaan</h1>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Pertanyaan #1</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-text-secondary-light hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">
                            Batal
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                            Simpan Perubahan
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
                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Aktif</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
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
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg font-bold text-text-secondary-light">
                                        {String.fromCharCode(65 + index)}
                                    </div>
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
                        <p className="text-xl font-medium text-text-main-light dark:text-text-main-dark mb-4">{questionText}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors cursor-pointer">
                                    <span className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-sm">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="text-sm text-text-main-light dark:text-text-main-dark">{option.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
