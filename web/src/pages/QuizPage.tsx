import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizPage() {
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const options = ['Kering & Kasar', 'Lembap & Halus', 'Berminyak', 'Normal'];

    const handleNext = () => {
        navigate('/result/demo');
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm font-bold text-primary">Soal 1 dari 10</h2>
                        <span className="text-sm text-gray-500">10% Selesai</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[10%] transition-all"></div>
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Bagaimana kondisi kulit Anda secara umum?
                    </h2>
                    <p className="text-gray-600">Pilih satu jawaban yang paling sesuai</p>
                </div>

                <div className="grid gap-4 mb-8">
                    {options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedAnswer(option)}
                            className={`p-6 rounded-xl border-2 text-left transition-all ${selectedAnswer === option
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-200 hover:border-primary/50'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${selectedAnswer === option ? 'bg-primary text-white' : 'bg-gray-100'
                                    }`}>
                                    {String.fromCharCode(65 + idx)}
                                </div>
                                <span className="font-medium">{option}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={() => navigate('/screening')}
                        className="px-6 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50"
                    >
                        Sebelumnya
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!selectedAnswer}
                        className="px-8 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
        </div>
    );
}
