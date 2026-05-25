import { create } from 'zustand'
import { getDb, type TestResult, type TestProgress, generateId } from '../lib/db'

interface TestState {
  currentTestType: string
  currentQuestionIndex: number
  answers: string[]
  results: TestResult[]
  loadResults: (userId: string) => Promise<void>
  saveProgress: (userId: string, testType: string, answers: string[]) => Promise<void>
  loadProgress: (userId: string, testType: string) => Promise<void>
  submitTest: (userId: string, testType: string, answers: string[], scores: string[]) => Promise<void>
  resetTest: () => void
}

export const useTestStore = create<TestState>((set) => ({
  currentTestType: '',
  currentQuestionIndex: 0,
  answers: [],
  results: [],

  loadResults: async (userId) => {
    const db = await getDb()
    const results = await db.getAllFromIndex('testResults', 'by-user-id', userId)
    set({ results: results.sort((a, b) => b.timestamp - a.timestamp) })
  },

  saveProgress: async (userId, testType, answers) => {
    const db = await getDb()
    const progressId = `${userId}-${testType}`
    const progress: TestProgress = {
      id: progressId,
      userId,
      testType,
      currentQuestionIndex: answers.length,
      answers,
      savedAt: Date.now(),
    }
    await db.put('testProgress', progress)
  },

  loadProgress: async (userId, testType) => {
    const db = await getDb()
    const progressId = `${userId}-${testType}`
    const progress = await db.get('testProgress', progressId)
    
    if (progress) {
      set({
        currentTestType: testType,
        currentQuestionIndex: progress.currentQuestionIndex,
        answers: progress.answers,
      })
    } else {
      set({
        currentTestType: testType,
        currentQuestionIndex: 0,
        answers: [],
      })
    }
  },

  submitTest: async (userId, testType, answers, scores) => {
    const db = await getDb()
    const result: TestResult = {
      id: Date.now(),
      userId,
      testType,
      testAnswers: answers,
      testScores: scores,
      timestamp: Date.now(),
    }
    
    await db.add('testResults', result)
    
    const progressId = `${userId}-${testType}`
    await db.delete('testProgress', progressId)
    
    await useTestStore.getState().loadResults(userId)
  },

  resetTest: () => {
    set({
      currentTestType: '',
      currentQuestionIndex: 0,
      answers: [],
    })
  },
}))
