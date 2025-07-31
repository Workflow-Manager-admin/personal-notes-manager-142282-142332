<template>
  <div class="h-screen flex bg-gray-50 text-gray-900">
    <!-- Sidebar -->
    <Sidebar
      :notes="notes"
      :selectedNoteId="selectedNoteId"
      @selectNote="handleSelectNote"
      @createNote="handleCreateNote"
      :searchTerm="searchTerm"
      @updateSearchTerm="updateSearchTerm"
      class="sidebar"
    />

    <!-- Main Panel -->
    <div class="flex flex-col flex-1">
      <!-- Topbar / Search bar -->
      <Topbar
        :searchTerm="searchTerm"
        @updateSearchTerm="updateSearchTerm"
        class="main-topbar"
      />

      <main class="flex-1 p-6 overflow-y-auto">
        <NoteEditor
          v-if="currentNote"
          :note="currentNote"
          :is-new="isNew"
          @save="handleSaveNote"
          @delete="handleDeleteNote"
        />
        <div v-else class="flex items-center justify-center h-full text-gray-400">
          Select or create a note to start editing.
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import Topbar from '~/components/Topbar.vue'
import NoteEditor from '~/components/NoteEditor.vue'
import { fetchNotes, createNote, updateNote, deleteNote } from '~/utils/api'
import type { Note } from '~/types/note'

// Notes state
const notes = ref<Note[]>([])
const selectedNoteId = ref<number | null>(null)
const isNew = ref(false)
const searchTerm = ref('')

// Fetch notes from the backend
const loadNotes = async () => {
  notes.value = await fetchNotes(searchTerm.value)
  // Select first note if not selecting any
  if (!selectedNoteId.value && notes.value.length) {
    selectedNoteId.value = notes.value[0].id
    isNew.value = false
  }
  // Deselect if filtered out
  if (
    selectedNoteId.value &&
    !notes.value.some(n => n.id === selectedNoteId.value)
  ) {
    selectedNoteId.value = null
  }
}

// Selected note
const currentNote = computed(() => {
  if (isNew.value && tempNote.value) return tempNote.value
  if (!selectedNoteId.value) return null
  return notes.value.find(n => n.id === selectedNoteId.value) || null
})

const tempNote = ref<Note | null>(null)

const handleSelectNote = (id: number) => {
  selectedNoteId.value = id
  isNew.value = false
  tempNote.value = null
}

const handleCreateNote = () => {
  isNew.value = true
  selectedNoteId.value = null
  tempNote.value = {
    id: 0,
    title: '',
    content: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
}

const handleSaveNote = async (note: Note) => {
  if (isNew.value) {
    const newNote = await createNote(note)
    await loadNotes()
    selectedNoteId.value = newNote.id
    isNew.value = false
    tempNote.value = null
  } else {
    await updateNote(note)
    await loadNotes()
  }
}

const handleDeleteNote = async (id: number) => {
  await deleteNote(id)
  await loadNotes()
  if (selectedNoteId.value === id) {
    selectedNoteId.value = notes.value.length ? notes.value[0].id : null
    isNew.value = false
    tempNote.value = null
  }
}

const updateSearchTerm = async (term: string) => {
  searchTerm.value = term
  await loadNotes()
}

onMounted(() => {
  loadNotes()
})
</script>

<style scoped>
.h-screen {
  min-height: 100vh;
}
/* Sidebar styles in Sidebar.vue */
.main-topbar {
  box-shadow: 0 1px 0 0 #ececec;
}
</style>
