<template>
  <section class="editor-container mx-auto max-w-3xl bg-white rounded-lg shadow border border-gray-100 p-6">
    <form @submit.prevent="onSave">
      <input
        v-model="localNote.title"
        placeholder="Note Title"
        class="block w-full mb-4 text-2xl font-semibold border-b border-gray-200 outline-none bg-transparent focus:border-secondary"
        required
        maxlength="100"
        autocomplete="off"
      />

      <textarea
        v-model="localNote.content"
        placeholder="Write your note..."
        rows="10"
        class="block w-full mb-4 text-base border border-gray-200 rounded px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:border-secondary"
        required
        style="min-height:12em"
      />

      <div class="flex justify-between items-center">
        <div>
          <button
            type="submit"
            class="px-4 py-2 rounded bg-secondary text-white hover:bg-teal-400 shadow transition"
            :disabled="!canSave"
          >
            Save
          </button>
          <span v-if="!isNew" class="ml-4 text-xs text-gray-400">Last updated: {{displayDate(localNote.updated_at)}}</span>
        </div>
        <button
          v-if="!isNew"
          type="button"
          class="px-3 py-2 rounded text-red-500 border border-red-200 hover:bg-red-50 ml-2"
          @click="onDelete"
        >
          Delete
        </button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Note } from '~/types/note'

const props = defineProps<{
  note: Note
  isNew: boolean
}>()

const emits = defineEmits(['save', 'delete'])

const localNote = ref({ ...props.note })

watch(
  () => props.note,
  note => {
    localNote.value = { ...note }
  },
  { deep: true }
)

const canSave = computed(() => localNote.value.title.trim() && localNote.value.content.trim())

const onSave = () => {
  const noteToSave = { ...localNote.value }
  // Set update timestamp only
  noteToSave.updated_at = new Date().toISOString()
  emits('save', noteToSave)
}

const onDelete = () => {
  emits('delete', localNote.value.id)
}

function displayDate(ts: string) {
  const date = new Date(ts)
  return date.toLocaleString()
}
</script>

<style scoped>
.editor-container {
  box-shadow: 0 2px 10px rgba(44,62,80,0.04);
}
.bg-secondary {
  background: #4fd1c5;
}
:deep(input:focus) {
  border-color: #4fd1c5;
}
:deep(textarea:focus) {
  border-color: #4fd1c5;
}
</style>
