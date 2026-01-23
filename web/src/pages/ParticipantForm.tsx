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
        sessionStorage.setItem('participantData', JSON.stringify(formData));
        navigate('/quiz');
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-surface-dark rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                        <span className="material-symbols-outlined text-primary text-3xl">health_and_safety</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Start Screening Mizaj</h1>
                    <p className="text-gray-600">Isi data diri Anda untuk memulai</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            placeholder="Masukkan nama lengkap"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Usia</label>
                            <input
                                type="number"
                                required
                                min={12}
                                max={65}
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Jenis Kelamin</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            >
                                <option value="male">Laki-laki</option>
                                <option value="female">Perempuan</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
                    >
                        Lanjutkan ke Screening
                    </button>
                </form>
            </div>
        </div>
    );
}
