<template>
  <section class="page">
    <h1 class="page__title">Categories</h1>
    <CardPanel title="Your categories">
      <ul class="list-reset">
        <li v-for="item in categoriesStore.items" :key="item.id" class="list-row">
          <span>{{ item.icon }} {{ item.name }}</span>
          <span>{{ item.id }}</span>
          <span>Category</span>
        </li>
      </ul>
      <BaseButton variant="surface" @click="modalOpen = true">Create category</BaseButton>
      <p class="status-line">Last action: {{ state }}</p>
    </CardPanel>

    <div class="grid-two">
      <CardPanel title="Templates placeholder">
        <ul class="list-reset">
          <li class="list-item">Freelancer template</li>
          <li class="list-item">Family template</li>
          <li class="list-item">Student template</li>
        </ul>
      </CardPanel>
      <CardPanel title="Icon picker placeholder">
        <p class="status-line">The icon and color picker grid will be available in this area.</p>
      </CardPanel>
    </div>

    <div v-if="modalOpen" class="auth-modal" role="dialog" aria-modal="true" aria-label="Create category">
      <div class="auth-modal__card">
        <h2 class="auth-modal__title">Create category</h2>

        <label class="auth-modal__label">
          Name
          <input v-model="form.name" class="auth-modal__input" type="text" />
        </label>

        <label class="auth-modal__label">
          Icon
          <select v-model="form.icon" class="auth-modal__input">
            <option value="⛽">Fuel</option>
            <option value="🛒">Groceries</option>
            <option value="💊">Medicines</option>
            <option value="🚕">Transport</option>
          </select>
        </label>

        <div class="button-row">
          <BaseButton variant="primary" @click="createCategory">Save</BaseButton>
          <BaseButton variant="outline" @click="modalOpen = false">Cancel</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useCategoriesStore } from '@/stores/categories'

const categoriesStore = useCategoriesStore()
const state = ref('idle')
const modalOpen = ref(false)
const form = ref({ name: '', icon: '⛽' })


function createCategory(): void {
  if (form.value.name.trim().length === 0) {
    return
  }

  categoriesStore.addCategory({
    id: form.value.name.toLowerCase().replaceAll(' ', '-'),
    name: form.value.name,
    icon: form.value.icon,
    colorToken: 'token-driven'
  })

  state.value = 'created'
  modalOpen.value = false
  form.value.name = ''
}
</script>
