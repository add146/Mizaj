import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

interface Question {
    id: string;
    question_text: string;
    order_index: number;
    is_active: boolean;
    options: any[];
}

export default function QuestionList() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            const data = await api.getQuestions();
            setQuestions(data);
        } catch (error) {
            console.error('Failed to load questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus soal ini?')) {
            try {
                await api.deleteQuestion(id);
                setQuestions(questions.filter(q => q.id !== id));
            } catch (error) {
                console.error('Failed to delete question:', error);
            }
        }
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
                            <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Kelola Soal</h1>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{questions.length} soal tersedia</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/admin/questions/new')}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Tambah Soal
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                        <p className="mt-4 text-text-secondary-light">Memuat soal...</p>
                    </div>
                ) : questions.length === 0 ? (
                    <div className="text-center py-12 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark">
                        <span className="material-symbols-outlined text-6xl text-gray-300">quiz</span>
                        <h3 className="mt-4 text-lg font-bold text-text-main-light dark:text-text-main-dark">Belum Ada Soal</h3>
                        <p className="mt-2 text-text-secondary-light">Klik tombol "Tambah Soal" untuk membuat soal pertama Anda.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {questions.map((question, index) => (
                            <div
                                key={question.id}
                                className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-text-main-light dark:text-text-main-dark mb-2">
                                            {question.question_text}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-text-secondary-light">
                                            <span>{question.options?.length || 4} opsi</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${question.is_active
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {question.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => navigate(`/admin/questions/${question.id}`)}
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            title="Edit"
                                        >
                                            <span className="material-symbols-outlined text-text-secondary-light">edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(question.id)}
                                            className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                            title="Hapus"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
