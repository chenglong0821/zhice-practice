import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useUserProgressStore } from '../stores/useUserProgressStore';
import { useWrongBookStore } from '../stores/useWrongBookStore';

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/practice', label: '智能刷题', icon: '📝' },
  { path: '/practice/exam', label: '模拟考试', icon: '📋' },
  { path: '/wrongbook', label: '错题本', icon: '📚' },
  { path: '/statistics', label: '学习统计', icon: '📊' },
];

const noteItems = [
  { path: '/notes', label: '职测知识点' },
  { path: '/notes/comprehensive', label: '综应A' },
  { path: '/notes/mindmap', label: '思维导图&真题' },
];

export default function MainLayout() {
  const wrongCount = useWrongBookStore(state => state.getWrongQuestionCount());
  const todayStats = useUserProgressStore(state => state.getTodayStats());
  const [showNotes, setShowNotes] = useState(false);

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
            {/* 知识点下拉菜单 */}
            <div
              className="relative"
              onMouseEnter={() => setShowNotes(true)}
              onMouseLeave={() => setShowNotes(false)}
            >
              <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-600">
                <span>💡</span>
                <span>知识点</span>
                <span className="text-xs">▼</span>
              </button>
              {showNotes && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg py-2 min-w-40 z-50">
                  {noteItems.map(item => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm ${
                          isActive
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
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
