const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export interface Question {
    id: string;
    question_text: string;
    order_index: number;
    is_active: boolean;
    shuffle_options: boolean;
    options: QuestionOption[];
}

export interface QuestionOption {
    id: string;
    question_id: string;
    mizaj_type: 'panas_lembab' | 'dingin_lembab' | 'panas_kering' | 'dingin_kering';
    option_text: string;
}

export interface ParticipantData {
    name: string;
    age: number;
    gender: 'male' | 'female';
    email?: string;
    phone?: string;
}

export interface QuizSubmission {
    participant: ParticipantData;
    answers: {
        question_id: string;
        selected_mizaj: string;
    }[];
}

export interface MizajResult {
    id: string;
    mizaj_type: string;
    title: string;
    description: string;
    characteristics?: string;
    dietary_recommendations?: string;
    lifestyle_recommendations?: string;
    image_url?: string;
}

export interface ParticipantResult {
    participant: {
        id: string;
        name: string;
        age: number;
        gender: string;
        result_mizaj_type: string;
        needs_interview: boolean;
        answer_counts: Record<string, number>;
        created_at: number;
    };
    mizaj_result: MizajResult;
}

class ApiClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.token = localStorage.getItem('auth_token');
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async login(email: string, password: string) {
        const data = await this.request<{ token: string }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        this.token = data.token;
        localStorage.setItem('auth_token', data.token);
        return data;
    }

    async logout() {
        this.token = null;
        localStorage.removeItem('auth_token');
    }

    async getQuestions(): Promise<Question[]> {
        return this.request<Question[]>('/api/questions');
    }

    async submitQuiz(submission: QuizSubmission): Promise<ParticipantResult> {
        return this.request<ParticipantResult>('/api/quiz/submit', {
            method: 'POST',
            body: JSON.stringify(submission),
        });
    }

    async getParticipantResult(id: string): Promise<ParticipantResult> {
        return this.request<ParticipantResult>(`/api/participants/${id}`);
    }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
