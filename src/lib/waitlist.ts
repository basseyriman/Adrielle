import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDb, isFirebaseConfigured } from './firebase'

export async function joinWaitlist(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase()
  if (!normalized) throw new Error('Email is required')

  const db = getDb()
  if (isFirebaseConfigured() && db) {
    await addDoc(collection(db, 'waitlist'), {
      email: normalized,
      createdAt: serverTimestamp(),
      source: 'landing',
    })
    return
  }

  // Local fallback when Firebase env vars are not set
  await new Promise((r) => setTimeout(r, 500))
  const existing = JSON.parse(
    localStorage.getItem('adrielle-waitlist') || '[]',
  ) as string[]
  if (!existing.includes(normalized)) {
    existing.push(normalized)
    localStorage.setItem('adrielle-waitlist', JSON.stringify(existing))
  }
}
