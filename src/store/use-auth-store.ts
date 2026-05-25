import { create } from 'zustand'
import { getDb, type User, generateId } from '../lib/db'

interface AuthState {
  currentUser: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  initAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isLoading: true,

  login: async (email, password) => {
    const db = await getDb()
    const users = await db.getAllFromIndex('users', 'by-email', email)
    
    if (users.length === 0) return false
    
    const user = users[0]
    if (user.password === password) {
      set({ currentUser: user })
      localStorage.setItem('currentUserId', user.id)
      return true
    }
    
    return false
  },

  register: async (email, password, name) => {
    const db = await getDb()
    const existingUsers = await db.getAllFromIndex('users', 'by-email', email)
    
    if (existingUsers.length > 0) return false
    
    const user: User = {
      id: generateId(),
      email,
      password,
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    
    await db.add('users', user)
    set({ currentUser: user })
    localStorage.setItem('currentUserId', user.id)
    return true
  },

  logout: () => {
    set({ currentUser: null })
    localStorage.removeItem('currentUserId')
  },

  initAuth: async () => {
    const userId = localStorage.getItem('currentUserId')
    if (userId) {
      const db = await getDb()
      const user = await db.get('users', userId)
      if (user) {
        set({ currentUser: user })
      }
    }
    set({ isLoading: false })
  },
}))
