import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ParticipantForm from './pages/ParticipantForm';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import QuestionEditor from './pages/admin/QuestionEditor';
import QuestionList from './pages/admin/QuestionList';
import ParticipantList from './pages/admin/ParticipantList';
import ParticipantDetail from './pages/admin/ParticipantDetail';
import MizajContent from './pages/admin/MizajContent';
import LandingEditor from './pages/admin/LandingEditor';
import Settings from './pages/admin/Settings';
import ProtectedRoute from './components/ProtectedRoute';

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
        {/* Admin Routes - Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/questions" element={<QuestionList />} />
          <Route path="/admin/questions/new" element={<QuestionEditor />} />
          <Route path="/admin/questions/:id" element={<QuestionEditor />} />
          <Route path="/admin/participants" element={<ParticipantList />} />
          <Route path="/admin/participants/:id" element={<ParticipantDetail />} />
          <Route path="/admin/mizaj" element={<MizajContent />} />
          <Route path="/admin/landing" element={<LandingEditor />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
