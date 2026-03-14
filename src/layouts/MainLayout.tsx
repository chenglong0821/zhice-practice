import { NavLink, Outlet } from 'react-router-dom';
import { useUserProgressStore } from '../stores/useUserProgressStore';
import { useWrongBookStore } from '../stores/useWrongBookStore';

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/practice', label: '智能刷题', icon: '📝' },
  { path: '/practice/exam', label: '模拟考试', icon: '📋' },
  { path: '/wrongbook', label: '错题本', icon: '📚' },
  { path: '/statistics', label: '学习统计', icon: '📊' },
  { path: '/notes', label: '知识点', icon: '💡' },
];

export default function MainLayout() {
  const wrongCount = useWrongBookStore(state => state.getWrongQuestionCount());
  const todayStats = useUserProgressStore(state => state.getTodayStats());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">职测刷题</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {todayStats && (
                <span>今日学习: {todayStats.studyTime}分钟</span>
              )}
              {wrongCount > 0 && (
                <span className="text-red-500">错题: {wrongCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
