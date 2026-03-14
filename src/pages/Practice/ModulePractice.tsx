import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ModuleType, Question } from '../../types/question';
import { getQuestionsByModule } from '../../data/questions';
import { useUserProgressStore } from '../../stores/useUserProgressStore';
import { useWrongBookStore } from '../../stores/useWrongBookStore';

const modules: { name: ModuleType; desc: string; color: string }[] = [
  { name: '判断', desc: '图形推理、定义判断、逻辑判断', color: 'bg-purple-500' },
  { name: '言语', desc: '阅读理解、逻辑填空、语句表达', color: 'bg-blue-500' },
  { name: '数量', desc: '数学运算、数字推理', color: 'bg-orange-500' },
  { name: '资料', desc: '资料分析', color: 'bg-green-500' },
  { name: '常识', desc: '常识判断', color: 'bg-red-500' },
];

export default function ModulePractice() {
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const recordAnswer = useUserProgressStore(state => state.recordAnswer);
  const addWrongQuestion = useWrongBookStore(state => state.addWrongQuestion);

  const handleSelectModule = (module: ModuleType) => {
    const moduleQuestions = getQuestionsByModule(module);
    const shuffled = [...moduleQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setSelectedModule(module);
    setCurrentIndex(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

  const handleAnswer = (answer: string) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (!selectedModule || !selectedAnswer) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = Array.isArray(currentQuestion.answer)
      ? currentQuestion.answer.includes(selectedAnswer)
      : currentQuestion.answer === selectedAnswer;

    // Record answer
    recordAnswer(selectedModule, isCorrect);

    // If wrong, add to wrong book
    if (!isCorrect) {
      addWrongQuestion(currentQuestion, selectedAnswer);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    if (selectedModule) {
      handleSelectModule(selectedModule);
    }
  };

  // If no module selected, show module selection
  if (!selectedModule) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">选择模块开始刷题</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map(module => (
            <button
              key={module.name}
              onClick={() => handleSelectModule(module.name)}
              className="bg-white rounded-xl p-6 shadow-sm border-2 border-transparent hover:border-blue-500 transition-all text-left"
            >
              <div className={`w-12 h-12 ${module.color} rounded-lg mb-4 flex items-center justify-center text-white text-xl font-bold`}>
                {module.name[0]}
              </div>
              <h3 className="font-semibold text-lg mb-1">{module.name}</h3>
              <p className="text-sm text-gray-500">{module.desc}</p>
              <p className="text-sm text-blue-500 mt-2">
                {getQuestionsByModule(module.name).length} 道题目
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // If finished, show summary
  if (isFinished) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-semibold mb-2">练习完成！</h2>
        <p className="text-gray-500 mb-6">你已完成本模块的全部练习</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            再次练习
          </button>
          <Link
            to="/practice"
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            返回选择
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedModule(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          ← 返回
        </button>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
            {currentQuestion.module}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
            {currentQuestion.type === 'single' ? '单选题' : '多选题'}
          </span>
        </div>

        <div className="text-lg mb-6">{currentQuestion.content}</div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map(option => {
            let optionClass = 'border-gray-200 hover:border-blue-500';
            if (showAnswer) {
              if (option.id === currentQuestion.answer) {
                optionClass = 'border-green-500 bg-green-50';
              } else if (option.id === selectedAnswer && option.id !== currentQuestion.answer) {
                optionClass = 'border-red-500 bg-red-50';
              }
            } else if (selectedAnswer === option.id) {
              optionClass = 'border-blue-500 bg-blue-50';
            }

            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={showAnswer}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${optionClass} ${!showAnswer ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span className="font-medium mr-2">{option.id}.</span>
                {option.content}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showAnswer && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="font-medium text-yellow-800 mb-2">解析</div>
            <p className="text-yellow-700">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            disabled={!selectedAnswer}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
          >
            查看答案
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {currentIndex < questions.length - 1 ? '下一题' : '完成'}
          </button>
        )}
      </div>
    </div>
  );
}
