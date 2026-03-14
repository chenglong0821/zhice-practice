import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ModuleType, DailyStats, UserProgress } from '../types/question';

interface UserProgressState {
  progress: UserProgress;
  dailyStats: DailyStats[];
  todayStudyTime: number;
  studyStartTime: number | null;

  // Actions
  startStudy: () => void;
  endStudy: () => void;
  recordAnswer: (module: ModuleType, isCorrect: boolean) => void;
  recordExam: (score: number, total: number, timeSpent: number) => void;
  resetProgress: () => void;
  getTodayStats: () => DailyStats | undefined;
}

const initialProgress: UserProgress = {
  moduleProgress: {
    '言语': { total: 0, answered: 0, correct: 0 },
    '判断': { total: 0, answered: 0, correct: 0 },
    '数量': { total: 0, answered: 0, correct: 0 },
    '资料': { total: 0, answered: 0, correct: 0 },
    '常识': { total: 0, answered: 0, correct: 0 },
  },
  examHistory: [],
  currentStreak: 0,
  lastStudyDate: '',
};

const getToday = () => new Date().toISOString().split('T')[0];

export const useUserProgressStore = create<UserProgressState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,
      dailyStats: [],
      todayStudyTime: 0,
      studyStartTime: null,

      startStudy: () => {
        set({ studyStartTime: Date.now() });
      },

      endStudy: () => {
        const { studyStartTime, dailyStats, progress } = get();
        if (!studyStartTime) return;

        const studyDuration = Math.floor((Date.now() - studyStartTime) / 60000);
        const today = getToday();

        const todayStats = dailyStats.find(s => s.date === today);
        if (todayStats) {
          todayStats.studyTime += studyDuration;
        } else {
          dailyStats.push({
            date: today,
            studyTime: studyDuration,
            questionsAnswered: 0,
            correctCount: 0,
          });
        }

        // Update streak
        let streak = progress.currentStreak;
        if (progress.lastStudyDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (progress.lastStudyDate === yesterday.toISOString().split('T')[0]) {
            streak += 1;
          } else if (progress.lastStudyDate !== today) {
            streak = 1;
          }
        }

        set({
          studyStartTime: null,
          dailyStats: [...dailyStats],
          progress: {
            ...progress,
            currentStreak: streak,
            lastStudyDate: today,
          },
        });
      },

      recordAnswer: (module: ModuleType, isCorrect: boolean) => {
        const { progress, dailyStats } = get();
        const today = getToday();

        const moduleProgress = { ...progress.moduleProgress[module] };
        moduleProgress.answered += 1;
        if (isCorrect) {
          moduleProgress.correct += 1;
        }

        const todayStats = dailyStats.find(s => s.date === today);
        if (todayStats) {
          todayStats.questionsAnswered += 1;
          if (isCorrect) todayStats.correctCount += 1;
        }

        set({
          progress: {
            ...progress,
            moduleProgress: {
              ...progress.moduleProgress,
              [module]: moduleProgress,
            },
          },
          dailyStats: [...dailyStats],
        });
      },

      recordExam: (score: number, total: number, timeSpent: number) => {
        const { progress } = get();
        const newExam = {
          id: Date.now().toString(),
          date: Date.now(),
          score,
          total,
          timeSpent,
        };

        set({
          progress: {
            ...progress,
            examHistory: [...progress.examHistory, newExam],
          },
        });
      },

      resetProgress: () => {
        set({
          progress: initialProgress,
          dailyStats: [],
          todayStudyTime: 0,
          studyStartTime: null,
        });
      },

      getTodayStats: () => {
        const { dailyStats } = get();
        const today = getToday();
        return dailyStats.find(s => s.date === today);
      },
    }),
    {
      name: 'user-progress-storage',
    }
  )
);
