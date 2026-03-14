import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allQuestions, getRandomQuestions } from '../../data/questions';
import { useUserProgressStore } from '../../stores/useUserProgressStore';
import { useWrongBookStore } from '../../stores/useWrongBookStore';
import type { Question } from '../../types/question';

const EXAM_QUESTIONS_COUNT = 100;

export default function ExamPractice() {
  const navigate = useNavigate();
  const [examState, setExamState] = useState<'ready' | 'ongoing' | 'finished'>('ready');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const recordExam = useUserProgressStore(state => state.recordExam);
  const addWrongQuestion = useWrongBookStore(state => state.addWrongQuestion);

  // Timer
  useEffect(() => {
    if (examState !== 'ongoing') return;

    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [examState]);

  const startExam = () => {
    const examQuestions = getRandomQuestions(EXAM_QUESTIONS_COUNT);
    setQuestions(examQuestions);
    setExamState('ongoing');
    setStartTime(Date.now());
  };

  const handleAnswer = (answer: string) => {
    if (showAnswer) return;
    setAnswers(prev => ({
      ...prev,
      [questions[currentIndex].id]: answer,
    }));
  };

  const handleNext = () => {
    if (!showAnswer) {
      setShowAnswer(true);
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // Finish exam
      finishExam();
    }
  };

  const finishExam = () => {
    if (!startTime) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 60000); // minutes
    setTimeSpent(timeSpent * 60); // convert to seconds for display

    // Calculate score
    let correctCount = 0;
    questions.forEach(q => {
      const userAnswer = answers[q.id];
      if (userAnswer) {
        const isCorrect = Array.isArray(q.answer)
          ? q.answer.includes(userAnswer)
          : q.answer === userAnswer;

        if (isCorrect) {
          correctCount++;
        } else {
          // Add to wrong book
          addWrongQuestion(q, userAnswer);
        }
      }
    });

    recordExam(correctCount, questions.length, timeSpent);
    setExamState('finished');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Ready state
  if (examState === 'ready') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-sm text-center">
        <h2 className="text-2xl font-bold mb-4">模拟考试</h2>
        <p className="text-gray-500 mb-6">
          本次考试共 {EXAM_QUESTIONS_COUNT} 道题目，涵盖所有模块
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium">题量</div>
            <div className="text-2xl font-bold text-blue-600">{EXAM_QUESTIONS_COUNT}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium">题型</div>
            <div className="text-gray-600">单选/多选</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium">模块</div>
            <div className="text-gray-600">言语/判断/数量/资料/常识</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium">题库</div>
            <div className="text-gray-600">{allQuestions.length}道</div>
          </div>
        </div>
        <button
          onClick={startExam}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg font-medium"
        >
          开始考试
        </button>
      </div>
    );
  }

  // Finished state
  if (examState === 'finished') {
    const correctCount = questions.filter(q => {
      const userAnswer = answers[q.id];
      if (!userAnswer) return false;
      return Array.isArray(q.answer)
        ? q.answer.includes(userAnswer)
        : q.answer === userAnswer;
    }).length;

    const score = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-sm text-center">
        <div className="text-5xl mb-4">{score >= 60 ? '🎉' : '💪'}</div>
        <h2 className="text-2xl font-bold mb-2">考试完成！</h2>
        <div className="text-5xl font-bold text-blue-600 mb-4">{score}分</div>
        <p className="text-gray-500 mb-6">
          正确 {correctCount} / {questions.length} 题 | 用时 {formatTime(timeSpent)}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              setExamState('ready');
              setAnswers({});
              setCurrentIndex(0);
              setTimeSpent(0);
              setShowAnswer(false);
            }}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            再次考试
          </button>
          <button
            onClick={() => navigate('/statistics')}
            className="w-full px-6 py-3 border rounded-lg hover:bg-gray-50 font-medium"
          >
            查看统计
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 text-gray-500 hover:text-gray-700"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // Ongoing state
  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm">
        <div className="text-sm text-gray-500">
          {currentIndex + 1} / {questions.length}
        </div>
        <div className="text-xl font-bold text-blue-600">
          {formatTime(timeSpent)}
        </div>
        <div className="text-sm text-gray-500">
          已答: {answeredCount}
        </div>
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
              } else if (option.id === answers[currentQuestion.id] && option.id !== currentQuestion.answer) {
                optionClass = 'border-red-500 bg-red-50';
              }
            } else if (answers[currentQuestion.id] === option.id) {
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
      <div className="flex justify-between">
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
              setShowAnswer(false);
            }
          }}
          disabled={currentIndex === 0}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          上一题
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {showAnswer
            ? currentIndex < questions.length - 1
              ? '下一题'
              : '完成考试'
            : '确认答案'}
        </button>
      </div>

      {/* Question Navigation */}
      <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
        <div className="text-sm text-gray-500 mb-3">题目导航</div>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setCurrentIndex(idx);
                setShowAnswer(false);
              }}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                idx === currentIndex
                  ? 'bg-blue-500 text-white'
                  : answers[q.id]
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
