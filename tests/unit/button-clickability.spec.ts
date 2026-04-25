import { fireEvent, render } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import { nextTick } from 'vue'
import AppShell from '@/components/layout/AppShell.vue'
import { routes } from '@/router'

async function renderApp(path: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes
  })

  router.push(path)
  await router.isReady()

  const rendered = render(AppShell, {
    global: {
      plugins: [createPinia(), router]
    }
  })

  return { router, ...rendered }
}

describe('button clickability', () => {
  it('clicks navigation and dashboard buttons', async () => {
    const view = await renderApp('/')
    const buttons = view.getAllByRole('button')

    for (const button of buttons) {
      await fireEvent.click(button)
    }

    await fireEvent.click(view.getByRole('button', { name: 'Добавить доход' }))
    expect(view.getByText('Последнее действие: add-income')).toBeTruthy()
  })

  it('clicks transactions filter buttons', async () => {
    const view = await renderApp('/transactions')

    await fireEvent.click(view.getByRole('button', { name: 'Все' }))
    await fireEvent.click(view.getByRole('button', { name: 'Доходы' }))
    await fireEvent.click(view.getByRole('button', { name: 'Расходы' }))

    expect(view.getByText('Фильтр: expense')).toBeTruthy()
  })

  it('clicks analytics range buttons', async () => {
    const view = await renderApp('/analytics')

    await fireEvent.click(view.getByRole('button', { name: 'Месяц' }))
    await fireEvent.click(view.getByRole('button', { name: 'Квартал' }))
    await fireEvent.click(view.getByRole('button', { name: 'Год' }))

    expect(view.getByText('Выбранный диапазон: year')).toBeTruthy()
  })

  it('clicks budgets action button', async () => {
    const view = await renderApp('/budgets')

    await fireEvent.click(view.getByRole('button', { name: 'Проверить превышения' }))
    expect(view.getByText('Статус: checked')).toBeTruthy()
  })

  it('clicks goals action button', async () => {
    const view = await renderApp('/goals')

    await fireEvent.click(view.getByRole('button', { name: 'Обновить прогноз' }))
    expect(view.getByText('Прогноз: updated')).toBeTruthy()
  })

  it('clicks categories action button', async () => {
    const view = await renderApp('/categories')

    await fireEvent.click(view.getByRole('button', { name: 'Добавить категорию' }))
    expect(view.getByText('Последнее действие: created')).toBeTruthy()
  })

  it('clicks settings currency and theme buttons', async () => {
    const view = await renderApp('/settings')

    await fireEvent.click(view.getByRole('button', { name: 'USD' }))
    await fireEvent.click(view.getByRole('button', { name: 'EUR' }))
    await fireEvent.click(view.getByRole('button', { name: 'RUB' }))
    await fireEvent.click(view.getByRole('button', { name: 'Переключить тему' }))

    expect(view.getByText('Валюта: RUB')).toBeTruthy()
    expect(view.getByText('Тема: light')).toBeTruthy()

    await fireEvent.click(view.getByRole('link', { name: 'Дашборд' }))
    await nextTick()
    expect(view.router.currentRoute.value.path).toBe('/')
  })
})
