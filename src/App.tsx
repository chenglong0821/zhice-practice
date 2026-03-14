import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ModulePractice from './pages/Practice/ModulePractice';
import ExamPractice from './pages/Practice/ExamPractice';
import WrongBook from './pages/WrongBook/WrongBook';
import Statistics from './pages/Statistics/Statistics';
import KnowledgePoints from './pages/Notes/KnowledgePoints';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="practice" element={<ModulePractice />} />
        <Route path="practice/exam" element={<ExamPractice />} />
        <Route path="wrongbook" element={<WrongBook />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="notes" element={<KnowledgePoints />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
