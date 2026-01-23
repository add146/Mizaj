import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ParticipantForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'male',
        contact: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Pass participant data to QuizPage via navigation state
        navigate('/quiz', {
            state: {
                participant: {
                    name: formData.name,
                    age: parseInt(formData.age),
                    gender: formData.gender
                }
            }
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-display overflow-x-hidden">
            {/* Top Navigation */}
            <nav className="w-full bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark relative z-10">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">spa</span>
                            </div>
                            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Mizaj Health</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-primary transition-colors">Home</button>
                            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">About</a>
                            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-[520px] bg-surface-light dark:bg-surface-dark rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-light dark:border-border-dark overflow-hidden">
                    {/* Header */}
                    <div className="px-6 pt-8 pb-4 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4 text-primary">
                            <span className="material-symbols-outlined text-3xl">health_and_safety</span>
                        </div>
                        <h1 className="text-3xl font-bold leading-tight mb-2 tracking-tight">Start Screening Mizaj</h1>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-relaxed max-w-sm mx-auto">
                            Isi data diri Anda untuk mendapatkan hasil analisis tubuh yang akurat based on traditional health principles.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 pb-8 pt-2 flex flex-col gap-5">
                        {/* Nama Lengkap */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium leading-normal" htmlFor="fullName">
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                </span>
                                <input
                                    className="form-input block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-black/20 placeholder-gray-400 focus:border-primary focus:ring-primary focus:ring-1 sm:text-base h-12 transition-colors outline-none"
                                    id="fullName"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Masukkan nama lengkap Anda"
                                />
                            </div>
                        </div>

                        {/* Usia & Gender Group */}
                        <div className="flex flex-col sm:flex-row gap-5">
                            {/* Usia */}
                            <div className="flex flex-col gap-2 flex-1">
                                <label className="text-sm font-medium leading-normal" htmlFor="age">
                                    Usia (Tahun)
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <span className="material-symbols-outlined text-[20px]">cake</span>
                                    </span>
                                    <input
                                        className="form-input block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-black/20 placeholder-gray-400 focus:border-primary focus:ring-primary focus:ring-1 sm:text-base h-12 transition-colors outline-none"
                                        id="age"
                                        type="number"
                                        min={12}
                                        max={120}
                                        required
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        placeholder="25"
                                    />
                                </div>
                            </div>

                            {/* Jenis Kelamin */}
                            <div className="flex flex-col gap-2 flex-1">
                                <span className="text-sm font-medium leading-normal">Jenis Kelamin</span>
                                <div className="grid grid-cols-2 bg-background-light dark:bg-black/20 p-1 rounded-lg h-12 border border-gray-200 dark:border-gray-700">
                                    <label className="cursor-pointer relative flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 overflow-hidden group">
                                        <input
                                            className="peer sr-only"
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={formData.gender === 'male'}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        />
                                        <div className="absolute inset-0 bg-transparent peer-checked:bg-primary peer-checked:shadow-sm transition-all duration-200"></div>
                                        <span className="relative z-10 text-gray-500 dark:text-gray-400 peer-checked:text-black flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[18px]">male</span>
                                            Laki-laki
                                        </span>
                                    </label>
                                    <label className="cursor-pointer relative flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 overflow-hidden group">
                                        <input
                                            className="peer sr-only"
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={formData.gender === 'female'}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        />
                                        <div className="absolute inset-0 bg-transparent peer-checked:bg-primary peer-checked:shadow-sm transition-all duration-200"></div>
                                        <span className="relative z-10 text-gray-500 dark:text-gray-400 peer-checked:text-black flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[18px]">female</span>
                                            Perempuan
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Contact (Optional) */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-baseline">
                                <label className="text-sm font-medium leading-normal" htmlFor="contact">
                                    No. WhatsApp / Email
                                </label>
                                <span className="text-xs text-text-secondary-light dark:text-gray-500">Opsional</span>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <span className="material-symbols-outlined text-[20px]">contact_mail</span>
                                </span>
                                <input
                                    className="form-input block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-black/20 placeholder-gray-400 focus:border-primary focus:ring-primary focus:ring-1 sm:text-base h-12 transition-colors outline-none"
                                    id="contact"
                                    type="text"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    placeholder="0812... atau email@domain.com"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="group w-full h-12 bg-primary hover:bg-primary/90 active:scale-[0.99] rounded-lg flex items-center justify-center gap-2 text-white text-base font-bold shadow-lg shadow-primary/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                <span>Lanjutkan ke Screening</span>
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </button>
                            <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-600">
                                Dengan melanjutkan, Anda menyetujui <a className="underline hover:text-primary" href="#">Syarat & Ketentuan</a> Mizaj Health.
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
