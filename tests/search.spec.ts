import { test, expect } from '@playwright/test'

test('search topics', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const search = page.getByTestId('search-input')

  search.fill('kotlin')

  await expect(page.getByRole('button')).toHaveCount(19)
})

test('search selection', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const search = page.getByTestId('search-input')

  search.fill('kotlin')

  const topic = page.getByTestId('topic-item-Get_started_with_Kotlin')

  await expect(topic.getByText('Kotlin')).toHaveClass(/text-highlight/)
})

test('no result', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const search = page.getByTestId('search-input')

  search.fill('fasfsaf')

  await expect(page.getByText('Nothing to show...')).toBeVisible()
})
