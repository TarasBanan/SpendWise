<template>
  <section class="page">
    <h1 class="page__title">Категории</h1>
    <CardPanel title="Мои категории">
      <ul class="list-reset">
        <li v-for="item in categoriesStore.items" :key="item.id" class="list-row">
          <span>{{ item.icon }} {{ item.name }}</span>
          <span>{{ item.id }}</span>
        </li>
      </ul>
      <BaseButton variant="surface" @click="state = 'created'">Добавить категорию</BaseButton>
      <p class="status-line">Последнее действие: {{ state }}</p>
    </CardPanel>
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
