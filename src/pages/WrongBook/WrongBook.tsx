import { useState } from 'react';
import { useWrongBookStore } from '../../stores/useWrongBookStore';
import { useUserProgressStore } from '../../stores/useUserProgressStore';
import type { ModuleType, WrongQuestion } from '../../types/question';

export default function WrongBook() {
  const [selectedQuestion, setSelectedQuestion] = useState<WrongQuestion | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [filterModule, setFilterModule] = useState<ModuleType | '全部'>('全部');

  const wrongQuestions = useWrongBookStore(state => state.wrongQuestions);
  const markAsMastered = useWrongBookStore(state => state.markAsMastered);
  const getWrongQuestionsByModule = useWrongBookStore(state => state.getWrongQuestionsByModule);

  const recordAnswer = useUserProgressStore(state => state.recordAnswer);
  const addWrongQuestion = useWrongBookStore(state => state.addWrongQuestion);

  const filteredQuestions = filterModule === '全部'
    ? wrongQuestions
    : getWrongQuestionsByModule(filterModule);

  const handleAnswer = (isCorrect: boolean) => {
    if (!selectedQuestion) return;

    recordAnswer(selectedQuestion.question.module, isCorrect);

    if (isCorrect) {
      markAsMastered(selectedQuestion.question.id);
      setSelectedQuestion(null);
      setShowAnswer(false);
    } else {
      addWrongQuestion(selectedQuestion.question, selectedQuestion.wrongAnswer);
    }
  };

  const modules: (ModuleType | '全部')[] = ['全部', '判断', '言语', '数量', '资料', '常识'];

  if (wrongQuestions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">📚</div>
        <h2 className="text-xl font-semibold mb-2">暂无错题</h2>
        <p className="text-gray-500">你还没有错题记录，继续加油刷题吧！</p>
      </div>
    );
  }

  // Show question detail
  if (selectedQuestion) {
    const q = selectedQuestion.question;
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => {
            setSelectedQuestion(null);
            setShowAnswer(false);
          }}
          className="text-gray-500 hover:text-gray-700 mb-4"
        >
          ← 返回错题列表
        </button>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
              {q.module}
            </span>
            <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded">
              错误 {selectedQuestion.wrongCount} 次
            </span>
          </div>

          <div className="text-lg mb-6">{q.content}</div>

          <div className="space-y-3 mb-6">
            {q.options.map(option => {
              let optionClass = 'border-gray-200';
              if (showAnswer) {
                if (option.id === q.answer) {
                  optionClass = 'border-green-500 bg-green-50';
                }
              }

              return (
                <div
                  key={option.id}
                  className={`p-4 border-2 rounded-lg ${optionClass}`}
                >
                  <span className="font-medium mr-2">{option.id}.</span>
                  {option.content}
                </div>
              );
            })}
          </div>

          {showAnswer && (
            <div className="mb-6">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-medium text-yellow-800 mb-2">解析</div>
                <p className="text-yellow-700">{q.explanation}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                查看答案
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  已掌握
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  仍需练习
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">错题本</h2>
        <div className="flex gap-2">
          {modules.map(module => (
            <button
              key={module}
              onClick={() => setFilterModule(module)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterModule === module
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {module}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">模块</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">题目</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">错误次数</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">状态</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredQuestions.map(wq => (
              <tr key={wq.question.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                    {wq.question.module}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="max-w-md truncate">{wq.question.content}</div>
                </td>
                <td className="px-4 py-3 text-red-500">{wq.wrongCount}</td>
                <td className="px-4 py-3">
                  {wq.mastered ? (
                    <span className="text-green-500">已掌握</span>
                  ) : (
                    <span className="text-red-500">待复习</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelectedQuestion(wq)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    复习
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500 text-center">
        共 {filteredQuestions.length} 道错题
      </div>
    </div>
  );
}
