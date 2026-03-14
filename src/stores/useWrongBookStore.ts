import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Question, WrongQuestion, ModuleType } from '../types/question';

interface WrongBookState {
  wrongQuestions: WrongQuestion[];

  // Actions
  addWrongQuestion: (question: Question, wrongAnswer: string | string[]) => void;
  removeWrongQuestion: (questionId: string) => void;
  markAsMastered: (questionId: string) => void;
  incrementWrongCount: (questionId: string) => void;
  clearWrongBook: () => void;
  getWrongQuestionsByModule: (module: ModuleType) => WrongQuestion[];
  getWrongQuestionCount: () => number;
  getMasteredCount: () => number;
}

export const useWrongBookStore = create<WrongBookState>()(
  persist(
    (set, get) => ({
      wrongQuestions: [],

      addWrongQuestion: (question: Question, wrongAnswer: string | string[]) => {
        const { wrongQuestions } = get();
        const existing = wrongQuestions.find(w => w.question.id === question.id);

        if (existing) {
          // Update existing wrong question
          const updated = wrongQuestions.map(w =>
            w.question.id === question.id
              ? {
                  ...w,
                  wrongAnswer,
                  wrongCount: w.wrongCount + 1,
                  lastWrongTime: Date.now(),
                  mastered: false,
                }
              : w
          );
          set({ wrongQuestions: updated });
        } else {
          // Add new wrong question
          const newWrong: WrongQuestion = {
            question,
            wrongAnswer,
            wrongCount: 1,
            lastWrongTime: Date.now(),
            mastered: false,
          };
          set({ wrongQuestions: [...wrongQuestions, newWrong] });
        }
      },

      removeWrongQuestion: (questionId: string) => {
        const { wrongQuestions } = get();
        set({
          wrongQuestions: wrongQuestions.filter(w => w.question.id !== questionId),
        });
      },

      markAsMastered: (questionId: string) => {
        const { wrongQuestions } = get();
        const updated = wrongQuestions.map(w =>
          w.question.id === questionId ? { ...w, mastered: true } : w
        );
        set({ wrongQuestions: updated });
      },

      incrementWrongCount: (questionId: string) => {
        const { wrongQuestions } = get();
        const updated = wrongQuestions.map(w =>
          w.question.id === questionId
            ? { ...w, wrongCount: w.wrongCount + 1, lastWrongTime: Date.now() }
            : w
        );
        set({ wrongQuestions: updated });
      },

      clearWrongBook: () => {
        set({ wrongQuestions: [] });
      },

      getWrongQuestionsByModule: (module: ModuleType) => {
        const { wrongQuestions } = get();
        return wrongQuestions.filter(w => w.question.module === module);
      },

      getWrongQuestionCount: () => {
        const { wrongQuestions } = get();
        return wrongQuestions.filter(w => !w.mastered).length;
      },

      getMasteredCount: () => {
        const { wrongQuestions } = get();
        return wrongQuestions.filter(w => w.mastered).length;
      },
    }),
    {
      name: 'wrong-book-storage',
    }
  )
);
