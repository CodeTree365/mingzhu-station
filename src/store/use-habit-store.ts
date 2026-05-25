import { create } from 'zustand'
import { getDb, type Habit, type HabitRecord, generateId } from '../lib/db'
import dayjs from 'dayjs'

interface HabitState {
  habits: Habit[]
  records: HabitRecord[]
  loadHabits: (userId: string) => Promise<void>
  loadRecords: (habitId: string) => Promise<void>
  createHabit: (userId: string, name: string, description: string, icon: string, color: string, frequency: 'daily' | 'weekly' | 'monthly', daysOfWeek?: number[], dayOfMonth?: number, reminderTime?: string) => Promise<void>
  updateHabit: (habitId: string, name: string, description: string, icon: string, color: string, frequency: 'daily' | 'weekly' | 'monthly', daysOfWeek?: number[], dayOfMonth?: number, reminderTime?: string) => Promise<void>
  deleteHabit: (habitId: string) => Promise<void>
  toggleHabit: (habitId: string, date: string) => Promise<void>
  getHabitStats: (habitId: string, days: number) => Promise<{ completed: number; total: number; streak: number }>
}

export const useHabitStore = create<HabitState>((set) => ({
  habits: [],
  records: [],

  loadHabits: async (userId) => {
    const db = await getDb()
    const habits = await db.getAllFromIndex('habits', 'by-user-id', userId)
    set({ habits: habits.sort((a, b) => b.createdAt - a.createdAt) })
  },

  loadRecords: async (habitId) => {
    const db = await getDb()
    const records = await db.getAllFromIndex('habitRecords', 'by-habit-id', habitId)
    set({ records: records.sort((a, b) => b.date.localeCompare(a.date)) })
  },

  createHabit: async (userId, name, description, icon, color, frequency, daysOfWeek, dayOfMonth, reminderTime) => {
    const db = await getDb()
    const habit: Habit = {
      id: generateId(),
      userId,
      name,
      description,
      icon,
      color,
      frequency,
      daysOfWeek,
      dayOfMonth,
      reminderTime,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await db.add('habits', habit)
    await useHabitStore.getState().loadHabits(userId)
  },

  updateHabit: async (habitId, name, description, icon, color, frequency, daysOfWeek, dayOfMonth, reminderTime) => {
    const db = await getDb()
    const habit = await db.get('habits', habitId)
    if (habit) {
      habit.name = name
      habit.description = description
      habit.icon = icon
      habit.color = color
      habit.frequency = frequency
      habit.daysOfWeek = daysOfWeek
      habit.dayOfMonth = dayOfMonth
      habit.reminderTime = reminderTime
      habit.updatedAt = Date.now()
      await db.put('habits', habit)
      await useHabitStore.getState().loadHabits(habit.userId)
    }
  },

  deleteHabit: async (habitId) => {
    const db = await getDb()
    const habit = await db.get('habits', habitId)
    if (habit) {
      const records = await db.getAllFromIndex('habitRecords', 'by-habit-id', habitId)
      for (const record of records) {
        await db.delete('habitRecords', record.id)
      }
      await db.delete('habits', habitId)
      await useHabitStore.getState().loadHabits(habit.userId)
    }
  },

  toggleHabit: async (habitId, date) => {
    const db = await getDb()
    const recordId = `${habitId}-${date}`
    const existingRecord = await db.get('habitRecords', recordId)
    
    if (existingRecord) {
      existingRecord.completed = !existingRecord.completed
      await db.put('habitRecords', existingRecord)
    } else {
      const record: HabitRecord = {
        id: recordId,
        habitId,
        date,
        completed: true,
        createdAt: Date.now(),
      }
      await db.add('habitRecords', record)
    }
    
    await useHabitStore.getState().loadRecords(habitId)
  },

  getHabitStats: async (habitId, days) => {
    const db = await getDb()
    const records = await db.getAllFromIndex('habitRecords', 'by-habit-id', habitId)
    
    const today = dayjs()
    let completed = 0
    let total = 0
    let streak = 0
    
    for (let i = 0; i < days; i++) {
      const date = today.subtract(i, 'day').format('YYYY-MM-DD')
      const record = records.find(r => r.date === date)
      
      if (record?.completed) {
        completed++
        streak++
      } else {
        if (i > 0) break
      }
      total++
    }
    
    return { completed, total, streak }
  },
}))
