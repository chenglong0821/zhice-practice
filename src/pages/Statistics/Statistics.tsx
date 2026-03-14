import { useUserProgressStore } from '../../stores/useUserProgressStore';
import { useWrongBookStore } from '../../stores/useWrongBookStore';
import type { ModuleType } from '../../types/question';

export default function Statistics() {
  const progress = useUserProgressStore(state => state.progress);
  const dailyStats = useUserProgressStore(state => state.dailyStats);

  const wrongCount = useWrongBookStore(state => state.getWrongQuestionCount());
  const masteredCount = useWrongBookStore(state => state.getMasteredCount());

  const totalAnswered = Object.values(progress.moduleProgress).reduce(
    (sum, m) => sum + m.answered,
    0
  );
  const totalCorrect = Object.values(progress.moduleProgress).reduce(
    (sum, m) => sum + m.correct,
    0
  );
  const overallRate = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Calculate weekly stats
  const last7Days = dailyStats.slice(-7);
  const weeklyStudyTime = last7Days.reduce((sum, d) => sum + d.studyTime, 0);

  // Recent exam results
  const recentExams = progress.examHistory.slice(-5).reverse();

  const modules: ModuleType[] = ['言语', '判断', '数量', '资料', '常识'];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">学习统计</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-3xl font-bold text-blue-600">{progress.currentStreak}</div>
          <div className="text-sm text-gray-500">连续学习天数</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-3xl font-bold text-green-600">{overallRate}%</div>
          <div className="text-sm text-gray-500">总正确率</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-3xl font-bold text-purple-600">{totalAnswered}</div>
          <div className="text-sm text-gray-500">总做题量</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-3xl font-bold text-orange-500">{weeklyStudyTime}</div>
          <div className="text-sm text-gray-500">本周学习(分钟)</div>
        </div>
      </div>

      {/* Module Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">各模块正确率</h3>
        <div className="space-y-4">
          {modules.map(module => {
            const moduleProgress = progress.moduleProgress[module];
            const rate = moduleProgress.answered > 0
              ? Math.round((moduleProgress.correct / moduleProgress.answered) * 100)
              : 0;

            return (
              <div key={module}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{module}</span>
                  <span className="text-sm text-gray-500">
                    {moduleProgress.correct}/{moduleProgress.answered} ({rate}%)
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      rate >= 80 ? 'bg-green-500' :
                      rate >= 60 ? 'bg-blue-500' :
                      rate >= 40 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Days */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">最近学习记录</h3>
          {dailyStats.length === 0 ? (
            <p className="text-gray-500 text-center py-4">暂无学习记录</p>
          ) : (
            <div className="space-y-3">
              {dailyStats.slice(-7).reverse().map(day => (
                <div key={day.date} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <div className="font-medium">{day.date}</div>
                    <div className="text-sm text-gray-500">
                      {day.questionsAnswered}题 / {day.correctCount}正确
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-blue-600">{day.studyTime}分钟</div>
                    <div className="text-sm text-gray-500">
                      {day.questionsAnswered > 0
                        ? Math.round((day.correctCount / day.questionsAnswered) * 100)
                        : 0}% 正确率
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Exams */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">模拟考试记录</h3>
          {recentExams.length === 0 ? (
            <p className="text-gray-500 text-center py-4">暂无考试记录</p>
          ) : (
            <div className="space-y-3">
              {recentExams.map(exam => (
                <div key={exam.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <div className="font-medium">
                      {new Date(exam.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {exam.timeSpent}分钟
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${
                    exam.score >= 60 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {exam.score}分
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Wrong Book Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">错题本统计</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl font-bold text-red-500">{wrongCount}</div>
            <div className="text-sm text-gray-500">待复习</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-500">{masteredCount}</div>
            <div className="text-sm text-gray-500">已掌握</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold">{wrongCount + masteredCount}</div>
            <div className="text-sm text-gray-500">总错题</div>
          </div>
        </div>
      </div>
    </div>
  );
}
