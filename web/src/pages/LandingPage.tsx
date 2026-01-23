import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-6 py-4">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">spa</span>
                    <h2 className="text-xl font-bold">BioFITRA</h2>
                </div>
                <button onClick={() => navigate('/screening')} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90">
                    Mulai Screening
                </button>
            </header>

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-black mb-6">
                        Kenali Karakter Tubuh Anda Sesuai <span className="text-primary">Fitrah</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Temukan keseimbangan kesehatan melalui screening Mizaj tradisional
                    </p>
                    <button
                        onClick={() => navigate('/screening')}
                        className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                        MULAI SCREENING
                    </button>
                </div>
            </main>
        </div>
    );
}
