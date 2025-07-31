<template>
  <header class="flex items-center px-6 py-2 bg-white topbar">
    <div class="flex-1">
      <input
        class="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 focus:bg-white focus:outline-none text-sm"
        placeholder="Search notes..."
        :value="searchTerm"
        @input="$emit('updateSearchTerm', $event.target.value)"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ searchTerm: string }>()
const emits = defineEmits(['updateSearchTerm'])
</script>

<style scoped>
.topbar {
  border-bottom: 1px solid #ececec;
  background: #fff;
}
</style>
