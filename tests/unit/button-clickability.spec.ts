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

async function loginAsAnna(view: Awaited<ReturnType<typeof renderApp>>) {
  await fireEvent.click(view.getByRole('button', { name: 'Already have an account?' }))
  await fireEvent.click(view.getByRole('button', { name: 'Log in' }))
}

describe('button clickability', () => {
  it('shows auth modal with registration first', async () => {
    const view = await renderApp('/')

    expect(view.getByText('Create account')).toBeTruthy()
    await fireEvent.click(view.getByRole('button', { name: 'Already have an account?' }))
    expect(view.getByText('Sign in')).toBeTruthy()
  })

  it('clicks navigation and dashboard buttons', async () => {
    const view = await renderApp('/')
    await loginAsAnna(view)

    await fireEvent.click(view.getByRole('button', { name: 'Add income' }))
    await fireEvent.click(view.getByRole('button', { name: 'Add expense' }))
    expect(view.getByText('Last action: add-expense')).toBeTruthy()
  })

  it('clicks transactions filter buttons', async () => {
    const view = await renderApp('/transactions')
    await loginAsAnna(view)

    await fireEvent.click(view.getByRole('button', { name: 'All' }))
    await fireEvent.click(view.getByRole('button', { name: 'Income' }))
    await fireEvent.click(view.getByRole('button', { name: 'Expense' }))

    expect(view.getByText('Filter: expense')).toBeTruthy()
  })

  it('clicks analytics range buttons', async () => {
    const view = await renderApp('/analytics')
    await loginAsAnna(view)

    await fireEvent.click(view.getByRole('button', { name: 'Month' }))
    await fireEvent.click(view.getByRole('button', { name: 'Quarter' }))
    await fireEvent.click(view.getByRole('button', { name: 'Year' }))

    expect(view.getByText('Selected range: year')).toBeTruthy()
  })

  it('clicks budgets action button', async () => {
    const view = await renderApp('/budgets')
    await loginAsAnna(view)

    await fireEvent.click(view.getByRole('button', { name: 'Check overages' }))
    expect(view.getByText('Status: checked')).toBeTruthy()
  })

  it('clicks goals action button', async () => {
    const view = await renderApp('/goals')
    await loginAsAnna(view)

    await fireEvent.click(view.getByRole('button', { name: 'Update forecast' }))
    expect(view.getByText('Forecast: updated')).toBeTruthy()
  })

  it('clicks categories action button', async () => {
    const view = await renderApp('/categories')
    await loginAsAnna(view)

    await fireEvent.click(view.getByRole('button', { name: 'Create category' }))
    expect(view.getByText('Last action: created')).toBeTruthy()
  })

  it('clicks settings currency and theme buttons', async () => {
    const view = await renderApp('/settings')
    await loginAsAnna(view)

    await fireEvent.click(view.getByRole('button', { name: 'USD' }))
    await fireEvent.click(view.getByRole('button', { name: 'EUR' }))
    await fireEvent.click(view.getByRole('button', { name: 'RUB' }))
    await fireEvent.click(view.getByRole('button', { name: 'Toggle theme' }))

    expect(view.getByText('Currency: RUB')).toBeTruthy()
    expect(view.getByText('Theme: light')).toBeTruthy()

    await fireEvent.click(view.getByRole('link', { name: 'Dashboard' }))
    await nextTick()
    expect(view.router.currentRoute.value.path).toBe('/')
  })
})
