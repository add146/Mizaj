export default function ResultPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-4">
            <div className="max-w-4xl mx-auto py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black mb-4">Hasil Screening Mizaj Anda</h1>
                    <p className="text-gray-600">Berdasarkan jawaban Anda</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <span className="material-symbols-outlined text-orange-500 text-6xl">local_fire_department</span>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-3">
                                DOMINAN
                            </span>
                            <h2 className="text-3xl font-black mb-2">PANAS LEMBAB</h2>
                            <p className="text-xl font-bold text-gray-600 mb-3">(Sanguinis/Damawi)</p>
                            <p className="text-gray-700">
                                Anda memiliki kecenderungan tubuh yang hangat dan lembab. Tipe ini dikenal energik, sosial, dan mudah bergaul.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 border-t pt-6">
                    <p>
                        Disclaimer: Hasil screening ini didasarkan pada prinsip pengobatan tradisional.
                        Konsultasikan dengan praktisi kesehatan untuk saran medis yang akurat.
                    </p>
                </div>
            </div>
        </div>
    );
}
