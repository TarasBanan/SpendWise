<template>
  <section class="page">
    <h1 class="page__title">Categories</h1>
    <CardPanel title="Your categories">
      <ul class="list-reset">
        <li v-for="item in categoriesStore.items" :key="item.id" class="list-row">
          <span>{{ item.icon }} {{ item.name }}</span>
          <span>{{ item.id }}</span>
          <span>{{ item.colorToken }}</span>
        </li>
      </ul>
      <BaseButton variant="surface" @click="state = 'created'">Create category</BaseButton>
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
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CardPanel from '@/components/common/CardPanel.vue'
import { useCategoriesStore } from '@/stores/categories'

const categoriesStore = useCategoriesStore()
const state = ref('idle')
</script>
