import { Link } from 'react-router-dom';
import { useUserProgressStore } from '../stores/useUserProgressStore';
import { useWrongBookStore } from '../stores/useWrongBookStore';
import { getQuestionStats } from '../data/questions';

export default function Home() {
  const progress = useUserProgressStore(state => state.progress);
  const todayStats = useUserProgressStore(state => state.getTodayStats());
  const wrongCount = useWrongBookStore(state => state.getWrongQuestionCount());
  const stats = getQuestionStats();

  const totalAnswered = Object.values(progress.moduleProgress).reduce(
    (sum, m) => sum + m.answered,
    0
  );
  const totalCorrect = Object.values(progress.moduleProgress).reduce(
    (sum, m) => sum + m.correct,
    0
  );
  const overallRate = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">欢迎回来！</h2>
        <p className="opacity-90">坚持刷题，祝你考试顺利！</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-3xl font-bold text-blue-600">{todayStats?.studyTime || 0}</div>
          <div className="text-sm text-gray-500">今日学习(分钟)</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-3xl font-bold text-green-600">{todayStats?.questionsAnswered || 0}</div>
          <div className="text-sm text-gray-500">今日做题</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-3xl font-bold text-orange-500">{overallRate}%</div>
          <div className="text-sm text-gray-500">总正确率</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-3xl font-bold text-red-500">{wrongCount}</div>
          <div className="text-sm text-gray-500">待复习错题</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">快速开始</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/practice"
            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">📝</span>
            <div>
              <div className="font-medium">按模块刷题</div>
              <div className="text-sm text-gray-500">针对薄弱模块强化练习</div>
            </div>
          </Link>
          <Link
            to="/practice/exam"
            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">📋</span>
            <div>
              <div className="font-medium">模拟考试</div>
              <div className="text-sm text-gray-500">全真模拟，检测学习效果</div>
            </div>
          </Link>
          {wrongCount > 0 && (
            <Link
              to="/wrongbook"
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">📚</span>
              <div>
                <div className="font-medium">错题复习</div>
                <div className="text-sm text-gray-500">{wrongCount}道错题待复习</div>
              </div>
            </Link>
          )}
          <Link
            to="/notes"
            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-medium">知识点背诵</div>
              <div className="text-sm text-gray-500">常考公式、速记技巧</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Module Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">各模块进度</h3>
        <div className="space-y-3">
          {stats.map(stat => {
            const moduleProgress = progress.moduleProgress[stat.module];
            const rate = moduleProgress.answered > 0
              ? Math.round((moduleProgress.correct / moduleProgress.answered) * 100)
              : 0;
            return (
              <div key={stat.module} className="flex items-center gap-4">
                <div className="w-16 font-medium">{stat.module}</div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-500 w-20">
                  {moduleProgress.correct}/{moduleProgress.answered} ({rate}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
