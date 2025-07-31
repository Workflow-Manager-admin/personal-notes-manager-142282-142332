import type { Note } from '~/types/note'

// You may need to update this URL based on deployed backend API
const API_BASE = '/api/notes'

/**
 * PUBLIC_INTERFACE
 * Fetch notes from backend (optionally filtered by search).
 */
export async function fetchNotes(search: string = ''): Promise<Note[]> {
  const url =
    search && search.trim()
      ? `${API_BASE}?search=${encodeURIComponent(search)}`
      : API_BASE
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch notes')
  return await res.json()
}

/**
 * PUBLIC_INTERFACE
 * Create a new note.
 */
export async function createNote(note: Omit<Note, 'id'>): Promise<Note> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  })
  if (!res.ok) throw new Error('Failed to create note')
  return await res.json()
}

/**
 * PUBLIC_INTERFACE
 * Update a note by ID.
 */
export async function updateNote(note: Note): Promise<Note> {
  const res = await fetch(`${API_BASE}/${note.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  })
  if (!res.ok) throw new Error('Failed to update note')
  return await res.json()
}

/**
 * PUBLIC_INTERFACE
 * Delete a note by ID.
 */
export async function deleteNote(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete note')
}
