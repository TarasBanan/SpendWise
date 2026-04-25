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
  it('opens add transaction modal and saves expense', async () => {
    const view = await renderApp('/')
    await loginAsAnna(view)

    expect(view.getByText('Your expenses will appear here.')).toBeTruthy()
    await fireEvent.click(view.getByRole('button', { name: 'Add expense' }))

    await fireEvent.update(view.getByLabelText('Amount'), '4500')
    await fireEvent.update(view.getByLabelText('Description'), 'Gas station')
    await fireEvent.click(view.getByRole('button', { name: 'Save' }))

    expect(view.getByText('Last action: add-expense')).toBeTruthy()
    expect(view.getByText('Gas station')).toBeTruthy()
  })

  it('filters transactions list by type', async () => {
    const view = await renderApp('/transactions')
    await loginAsAnna(view)

    await fireEvent.click(view.getByRole('button', { name: 'Income' }))
    expect(view.getByText('Filter: income')).toBeTruthy()

    await fireEvent.click(view.getByRole('button', { name: 'Expense' }))
    expect(view.getByText('Filter: expense')).toBeTruthy()
  })

  it('renders analytics calculations', async () => {
    const view = await renderApp('/analytics')
    await loginAsAnna(view)

    expect(view.getByText('Income vs expense')).toBeTruthy()
    expect(view.getByText(/Net balance:/)).toBeTruthy()
    expect(view.getByText(/Transactions count:/)).toBeTruthy()
  })

  it('creates category from modal', async () => {
    const view = await renderApp('/categories')
    await loginAsAnna(view)

    await fireEvent.click(view.getByRole('button', { name: 'Create category' }))
    await fireEvent.update(view.getByLabelText('Name'), 'Fuel')
    await fireEvent.click(view.getByRole('button', { name: 'Save' }))

    expect(view.getByText('Last action: created')).toBeTruthy()
    expect(view.getByText('Fuel')).toBeTruthy()
  })

  it('adds goals and budgets with new action buttons', async () => {
    const goalsView = await renderApp('/goals')
    await loginAsAnna(goalsView)

    await fireEvent.click(goalsView.getByRole('button', { name: 'Add goal' }))
    await fireEvent.update(goalsView.getByLabelText('Goal title'), 'New laptop')
    await fireEvent.click(goalsView.getByRole('button', { name: 'Save' }))
    expect(goalsView.getByText('Status: goal-added')).toBeTruthy()

    const budgetsView = await renderApp('/budgets')
    await loginAsAnna(budgetsView)

    await fireEvent.click(budgetsView.getByRole('button', { name: 'Configure budgets' }))
    await fireEvent.update(budgetsView.getByLabelText('Category ID'), 'fuel')
    await fireEvent.update(budgetsView.getByLabelText('Monthly limit'), '12000')
    await fireEvent.click(budgetsView.getByRole('button', { name: 'Save' }))

    expect(budgetsView.getByText('Status: configured')).toBeTruthy()
  })

  it('navigates from settings', async () => {
    const view = await renderApp('/settings')
    await loginAsAnna(view)

    await fireEvent.click(view.getByRole('button', { name: 'Toggle theme' }))
    expect(view.getByText('Theme: light')).toBeTruthy()

    await fireEvent.click(view.getByRole('link', { name: 'Dashboard' }))
    await nextTick()
    expect(view.router.currentRoute.value.path).toBe('/')
  })
})
