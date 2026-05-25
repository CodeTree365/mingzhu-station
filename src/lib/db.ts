import { openDB, type DBSchema, type IDBPDatabase } from 'idb'

interface MingzhuStationDB extends DBSchema {
  users: {
    key: string
    value: User
    indexes: { 'by-email': string }
  }
  testResults: {
    key: number
    value: TestResult
    indexes: { 'by-user-id': string; 'by-timestamp': number }
  }
  testProgress: {
    key: string
    value: TestProgress
  }
  diaries: {
    key: string
    value: Diary
    indexes: { 'by-user-id': string; 'by-date': string }
  }
  habits: {
    key: string
    value: Habit
    indexes: { 'by-user-id': string }
  }
  habitRecords: {
    key: string
    value: HabitRecord
    indexes: { 'by-habit-id': string; 'by-date': string }
  }
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  createdAt: number
  updatedAt: number
}

export interface TestQuestion {
  no: number
  question: string
  answerOptions: {
    type: string
    answer: string
    score: string
  }[]
}

export interface TestResult {
  id: number
  userId: string
  testType: string
  testAnswers: string[]
  testScores: string[]
  timestamp: number
}

export interface TestProgress {
  id: string
  userId: string
  testType: string
  currentQuestionIndex: number
  answers: string[]
  savedAt: number
}

export interface Diary {
  id: string
  userId: string
  title: string
  content: string
  images: string[]
  mood: string
  createdAt: number
  updatedAt: number
}

export interface Habit {
  id: string
  userId: string
  name: string
  description: string
  icon: string
  color: string
  frequency: 'daily' | 'weekly' | 'monthly'
  daysOfWeek?: number[]
  dayOfMonth?: number
  reminderTime?: string
  createdAt: number
  updatedAt: number
}

export interface HabitRecord {
  id: string
  habitId: string
  date: string
  completed: boolean
  notes?: string
  createdAt: number
}

const DB_NAME = 'MINGZHU_STATION_DB'
const DB_VERSION = 2

let dbInstance: IDBPDatabase<MingzhuStationDB> | null = null

export async function getDb(): Promise<IDBPDatabase<MingzhuStationDB>> {
  if (dbInstance) return dbInstance

  dbInstance = await openDB<MingzhuStationDB>(DB_NAME, DB_VERSION, {
    upgrade(idb) {
      const userStore = idb.createObjectStore('users', { keyPath: 'id' })
      userStore.createIndex('by-email', 'email', { unique: true })

      const testResultStore = idb.createObjectStore('testResults', { keyPath: 'id' })
      testResultStore.createIndex('by-user-id', 'userId')
      testResultStore.createIndex('by-timestamp', 'timestamp')

      idb.createObjectStore('testProgress', { keyPath: 'id' })

      const diaryStore = idb.createObjectStore('diaries', { keyPath: 'id' })
      diaryStore.createIndex('by-user-id', 'userId')
      diaryStore.createIndex('by-date', 'createdAt')

      const habitStore = idb.createObjectStore('habits', { keyPath: 'id' })
      habitStore.createIndex('by-user-id', 'userId')

      const habitRecordStore = idb.createObjectStore('habitRecords', { keyPath: 'id' })
      habitRecordStore.createIndex('by-habit-id', 'habitId')
      habitRecordStore.createIndex('by-date', 'date')
    },
  })

  return dbInstance
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
