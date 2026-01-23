import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizPage() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answers, setAnswers] = useState<string[]>([]);

    const questions = [
        {
            id: '1',
            question_text: 'Bagaimana kondisi kulit Anda secara umum sepanjang tahun?',
            options: [
                { mizaj_type: 'panas_lembab', option_text: 'Lembap, halus, dan sering terasa hangat' },
                { mizaj_type: 'dingin_lembab', option_text: 'Berminyak dan cenderung pucat' },
                { mizaj_type: 'panas_kering', option_text: 'Kering, kasar, dan sering terasa panas' },
                { mizaj_type: 'dingin_kering', option_text: 'Kering dan terasa dingin saat disentuh' }
            ]
        },
        {
            id: '2',
            question_text: 'Bagaimana respons tubuh Anda terhadap cuaca panas?',
            options: [
                { mizaj_type: 'panas_lembab', option_text: 'Merasa tidak nyaman dan mudah berkeringat' },
                { mizaj_type: 'dingin_lembab', option_text: 'Cukup bisa mentoleransi' },
                { mizaj_type: 'panas_kering', option_text: 'Sangat tidak nyaman, mudah dehidrasi' },
                { mizaj_type: 'dingin_kering', option_text: 'Menyukai cuaca hangat, merasa lebih baik' }
            ]
        },
        {
            id: '3',
            question_text: 'Bagaimana pola tidur Anda secara umum?',
            options: [
                { mizaj_type: 'panas_lembab', option_text: 'Tidur nyenyak, mudah tertidur' },
                { mizaj_type: 'dingin_lembab', option_text: 'Tidur sangat lama, sulit bangun' },
                { mizaj_type: 'panas_kering', option_text: 'Tidur sedikit tapi merasa cukup' },
                { mizaj_type: 'dingin_kering', option_text: 'Sulit tidur, sering terbangun' }
            ]
        }
    ];

    const handleNext = () => {
        if (selectedAnswer) {
            const newAnswers = [...answers];
            newAnswers[currentQuestion] = selectedAnswer;
            setAnswers(newAnswers);

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(answers[currentQuestion + 1] || null);
            } else {
                navigate('/result/demo');
            }
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(answers[currentQuestion - 1] || null);
        }
    };

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
                        <div className="flex items-center gap-2">
                            <div className="size-6 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[24px]">spa</span>
                            </div>
                            <h1 className="text-lg font-bold leading-tight tracking-tight">Mizaj Screening</h1>
                        </div>
                    </div>
                    <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {currentQuestion + 1} / {questions.length}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col w-full max-w-[960px] mx-auto px-4 md:px-10 py-6 md:py-10">
                {/* Progress Section */}
                <section className="mb-8 md:mb-12">
                    <div className="flex justify-between items-end mb-3 px-1">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-wider">
                            Soal {currentQuestion + 1} dari {questions.length}
                        </h2>
                        <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                            {Math.round(progress)}% Selesai
                        </span>
                    </div>
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </section>

                {/* Question Section */}
                <section className="mb-8 md:mb-10 text-center px-2 md:px-12">
                    <h2 className="text-2xl md:text-[32px] font-bold leading-tight md:leading-snug mb-4">
                        {currentQ.question_text}
                    </h2>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-base md:text-lg">
                        Pilih satu jawaban yang paling menggambarkan kondisi harian Anda.
                    </p>
                </section>

                {/* Answers Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
                    {currentQ.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedAnswer(option.mizaj_type)}
                            className={`group relative flex items-start gap-4 p-5 md:p-6 rounded-xl border-2 transition-all duration-200 text-left focus:outline-none focus:ring-4 focus:ring-primary/20 ${selectedAnswer === option.mizaj_type
                                    ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark hover:border-primary/50 hover:shadow-lg'
                                }`}
                        >
                            <div className={`flex-shrink-0 size-12 rounded-lg flex items-center justify-center transition-colors ${selectedAnswer === option.mizaj_type
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 text-text-main-light dark:text-text-main-dark group-hover:text-primary'
                                }`}>
                                <span className="text-xl font-bold">{String.fromCharCode(65 + index)}</span>
                            </div>
                            <div className="flex flex-col gap-1 flex-grow">
                                <span className={`font-semibold text-base ${selectedAnswer === option.mizaj_type
                                        ? 'text-primary'
                                        : 'text-text-main-light dark:text-text-main-dark'
                                    }`}>
                                    {option.option_text}
                                </span>
                            </div>
                            {selectedAnswer === option.mizaj_type && (
                                <div className="absolute -top-2 -right-2 bg-background-light dark:bg-background-dark rounded-full">
                                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                </div>
                            )}
                        </button>
                    ))}
                </section>

                {/* Navigation Footer */}
                <nav className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-text-main-light dark:hover:text-text-main-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-xl">arrow_back</span>
                        <span className="hidden md:inline">Sebelumnya</span>
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!selectedAnswer}
                        className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        <span>{currentQuestion === questions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya'}</span>
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                </nav>
            </main>
        </div>
    );
}
