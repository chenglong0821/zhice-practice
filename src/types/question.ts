// 题目模块类型
export type ModuleType = '言语' | '判断' | '数量' | '资料' | '常识' | '综应';

// 题目类型
export type QuestionType = 'single' | 'multiple';

// 题目答案选项
export interface Option {
  id: string;
  content: string;
}

// 题目
export interface Question {
  id: string;
  module: ModuleType;
  type: QuestionType;
  content: string;
  options: Option[];
  answer: string | string[];
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  source?: string;
}

// 用户答题记录
export interface AnswerRecord {
  questionId: string;
  selectedAnswer: string | string[];
  isCorrect: boolean;
  timestamp: number;
}

// 错题记录
export interface WrongQuestion {
  question: Question;
  wrongAnswer: string | string[];
  wrongCount: number;
  lastWrongTime: number;
  mastered: boolean;
}

// 学习统计
export interface DailyStats {
  date: string;
  studyTime: number; // 分钟
  questionsAnswered: number;
  correctCount: number;
}

// 用户进度
export interface UserProgress {
  moduleProgress: Record<ModuleType, {
    total: number;
    answered: number;
    correct: number;
  }>;
  examHistory: {
    id: string;
    date: number;
    score: number;
    total: number;
    timeSpent: number;
  }[];
  currentStreak: number;
  lastStudyDate: string;
}

// 知识点
export interface KnowledgePoint {
  id: string;
  module: ModuleType;
  title: string;
  content: string;
  category: string;
}
