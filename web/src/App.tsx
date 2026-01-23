import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ParticipantForm from './pages/ParticipantForm';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import QuestionEditor from './pages/admin/QuestionEditor';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/screening" element={<ParticipantForm />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result/:id" element={<ResultPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/questions/:id" element={<QuestionEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
