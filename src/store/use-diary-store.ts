import { create } from 'zustand'
import { getDb, type Diary, generateId } from '../lib/db'

interface DiaryState {
  diaries: Diary[]
  selectedDiary: Diary | null
  loadDiaries: (userId: string) => Promise<void>
  createDiary: (userId: string, title: string, content: string, mood: string, images: string[]) => Promise<void>
  updateDiary: (diaryId: string, title: string, content: string, mood: string, images: string[]) => Promise<void>
  deleteDiary: (diaryId: string) => Promise<void>
  selectDiary: (diary: Diary | null) => void
  searchDiaries: (userId: string, keyword: string, startDate?: number, endDate?: number, mood?: string) => Promise<Diary[]>
}

export const useDiaryStore = create<DiaryState>((set) => ({
  diaries: [],
  selectedDiary: null,

  loadDiaries: async (userId) => {
    const db = await getDb()
    const diaries = await db.getAllFromIndex('diaries', 'by-user-id', userId)
    set({ diaries: diaries.sort((a, b) => b.createdAt - a.createdAt) })
  },

  createDiary: async (userId, title, content, mood, images) => {
    const db = await getDb()
    const diary: Diary = {
      id: generateId(),
      userId,
      title,
      content,
      images,
      mood,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await db.add('diaries', diary)
    await useDiaryStore.getState().loadDiaries(userId)
  },

  updateDiary: async (diaryId, title, content, mood, images) => {
    const db = await getDb()
    const diary = await db.get('diaries', diaryId)
    if (diary) {
      diary.title = title
      diary.content = content
      diary.mood = mood
      diary.images = images
      diary.updatedAt = Date.now()
      await db.put('diaries', diary)
      await useDiaryStore.getState().loadDiaries(diary.userId)
    }
  },

  deleteDiary: async (diaryId) => {
    const db = await getDb()
    const diary = await db.get('diaries', diaryId)
    if (diary) {
      await db.delete('diaries', diaryId)
      await useDiaryStore.getState().loadDiaries(diary.userId)
    }
  },

  selectDiary: (diary) => {
    set({ selectedDiary: diary })
  },

  searchDiaries: async (userId, keyword, startDate, endDate, mood) => {
    const db = await getDb()
    let diaries = await db.getAllFromIndex('diaries', 'by-user-id', userId)
    
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase()
      diaries = diaries.filter(d => 
        d.title.toLowerCase().includes(lowerKeyword) || 
        d.content.toLowerCase().includes(lowerKeyword)
      )
    }
    
    if (startDate) {
      diaries = diaries.filter(d => d.createdAt >= startDate)
    }
    
    if (endDate) {
      diaries = diaries.filter(d => d.createdAt <= endDate)
    }
    
    if (mood && mood !== 'all') {
      diaries = diaries.filter(d => d.mood === mood)
    }
    
    return diaries.sort((a, b) => b.createdAt - a.createdAt)
  },
}))
