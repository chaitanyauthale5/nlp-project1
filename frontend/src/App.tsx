import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import { DashboardLayout } from './components/DashboardLayout';
import { OverviewPage } from './pages/Overview';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzer';
import { JobMatcherPage } from './pages/JobMatcher';
import { InterviewCoachPage } from './pages/InterviewCoach';
import { ProfilePage, SettingsPage } from './pages/ProfileSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="resume" element={<ResumeAnalyzerPage />} />
          <Route path="match" element={<JobMatcherPage />} />
          <Route path="interview" element={<InterviewCoachPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
