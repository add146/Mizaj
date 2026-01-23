import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/admin');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
            <div className="max-w-md w-full">
                <div className="mb-10">
                    <h2 className="text-4xl font-black mb-3">Admin Login</h2>
                    <p className="text-gray-600">Please sign in to manage the BioFITRA dashboard.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-base font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-14 px-4 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            placeholder="user@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-base font-medium mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full h-14 px-4 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            placeholder="••••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-14 flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-lg transition-all"
                    >
                        Masuk ke Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
