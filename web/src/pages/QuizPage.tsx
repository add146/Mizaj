import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api, { type Question } from '../lib/api';

interface Answer {
    question_id: string;
    selected_mizaj: string;
}

export default function QuizPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);

    // Get participant data from navigation state
    const participant = location.state?.participant;

    useEffect(() => {
        if (!participant) {
            navigate('/screening');
            return;
        }
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            const data = await api.getQuestions();
            setQuestions(data);
        } catch (error) {
            console.error('Failed to load questions:', error);
            alert('Gagal memuat soal. Silakan coba lagi.');
            navigate('/screening');
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async () => {
        if (!selectedAnswer) return;

        const newAnswers = [...answers];
        const existingIndex = newAnswers.findIndex(a => a.question_id === questions[currentQuestion].id);

        if (existingIndex >= 0) {
            newAnswers[existingIndex] = { question_id: questions[currentQuestion].id, selected_mizaj: selectedAnswer };
        } else {
            newAnswers.push({ question_id: questions[currentQuestion].id, selected_mizaj: selectedAnswer });
        }
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            const nextAnswer = newAnswers.find(a => a.question_id === questions[currentQuestion + 1]?.id);
            setSelectedAnswer(nextAnswer?.selected_mizaj || null);
        } else {
            // Submit quiz
            await submitQuiz(newAnswers);
        }
    };

    const submitQuiz = async (finalAnswers: Answer[]) => {
        setSubmitting(true);
        try {
            const result = await api.submitQuiz({
                participant,
                answers: finalAnswers
            });
            navigate(`/result/${result.participant.id}`, { state: { result } });
        } catch (error) {
            console.error('Failed to submit quiz:', error);
            alert('Gagal menyimpan hasil. Silakan coba lagi.');
        } finally {
            setSubmitting(false);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            const prevAnswer = answers.find(a => a.question_id === questions[currentQuestion - 1]?.id);
            setSelectedAnswer(prevAnswer?.selected_mizaj || null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                    <p className="mt-4 text-text-secondary-light">Memuat soal...</p>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300">quiz</span>
                    <h2 className="mt-4 text-xl font-bold text-text-main-light">Belum Ada Soal</h2>
                    <p className="mt-2 text-text-secondary-light">Soal screening belum tersedia.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-6 py-2 rounded-lg bg-primary text-white font-medium"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const currentQ = questions[currentQuestion];

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-display antialiased min-h-screen flex flex-col transition-colors duration-200">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-[960px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/screening')}
                            aria-label="Go back"
                            className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined align-middle">arrow_back</span>
                        </button>
                        <h1 className="text-lg font-bold leading-tight tracking-tight">Screening Mizaj</h1>
                    </div>
                    <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                        {currentQuestion + 1} / {questions.length}
                    </span>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-700">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col max-w-[960px] mx-auto w-full p-4 md:p-10">
                {/* Question */}
                <div className="flex-1 flex flex-col justify-center py-8">
                    <h2 className="text-xl md:text-2xl font-bold leading-tight mb-8 text-center">
                        {currentQ.question_text}
                    </h2>

                    {/* Options */}
                    <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto w-full">
                        {currentQ.options.map((option) => (
                            <button
                                key={option.id || option.mizaj_type}
                                onClick={() => setSelectedAnswer(option.mizaj_type)}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${selectedAnswer === option.mizaj_type
                                    ? 'border-primary bg-primary/10 text-primary font-medium'
                                    : 'border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-primary/50'
                                    }`}
                            >
                                <span className="text-sm md:text-base">{option.option_text}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-border-light dark:border-border-dark">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-text-secondary-light hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Sebelumnya
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!selectedAnswer || submitting}
                        className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                Menyimpan...
                            </>
                        ) : currentQuestion === questions.length - 1 ? (
                            <>
                                Lihat Hasil
                                <span className="material-symbols-outlined">check</span>
                            </>
                        ) : (
                            <>
                                Selanjutnya
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </>
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
}
