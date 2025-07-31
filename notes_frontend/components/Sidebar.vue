<template>
  <aside class="bg-white border-r border-gray-200 w-72 px-4 py-6 flex flex-col sidebar">
    <div class="mb-4 flex items-center">
      <span class="font-extrabold text-xl text-primary">Notes</span>
      <button
        class="ml-auto px-2 py-1 rounded bg-accent text-primary outline-none hover:bg-yellow-200 transition"
        @click="$emit('createNote')"
        title="Create new note"
      >
        +
      </button>
    </div>
    <div class="mb-3">
      <input
        class="w-full px-3 py-2 border focus:outline-none rounded bg-gray-100"
        type="text"
        placeholder="Search notes..."
        :value="searchTerm"
        @input="$emit('updateSearchTerm', $event.target.value)"
      />
    </div>
    <div class="flex-1 overflow-y-auto">
      <ul>
        <li
          v-for="note in filteredNotes"
          :key="note.id"
          @click="$emit('selectNote', note.id)"
          :class="['note-item', selectedNoteId===note.id?'active': '']"
        >
          <div class="truncate font-semibold">{{ note.title || 'Untitled note' }}</div>
          <div class="text-xs text-gray-400 truncate">{{ note.content }}</div>
        </li>
        <li v-if="filteredNotes.length===0" class="text-gray-400 text-center py-4">
          No notes found.
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Note } from '~/types/note'
defineProps<{
  notes: Note[]
  selectedNoteId: number | null
  searchTerm: string
}>()

const emits = defineEmits(['selectNote', 'createNote', 'updateSearchTerm'])

const filteredNotes = computed(() => {
  // Filtering should occur at list render if not already backend filtered
  return notes
})
</script>

<style scoped>
.sidebar {
  min-width: 16rem;
  background: #fff;
  border-right: 1px solid #f0f0f0;
}
.note-item {
  cursor: pointer;
  padding: 0.6em 0.4em;
  border-radius: 6px;
  margin-bottom: 2px;
  transition: background .1s;
}
.note-item.active {
  background-color: #f6e05e22;
  color: #2d3748;
  font-weight: bold;
}
.note-item:hover:not(.active) {
  background: #f0f0f0;
}
.text-primary {
  color: #2d3748;
}
.bg-accent {
  background: #f6e05e;
}
</style>
