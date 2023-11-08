import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await expect(page).toHaveTitle(/JetBrains TOC/)
})

test('topics visible', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await expect(page.getByRole('button')).toHaveCount(20)
})

test('tree clickable', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await page.getByTestId('topic-item-Configuring_Project_and_IDE_Settings').click()
  await expect(page.getByTestId('topic-item-4d0bfef4')).toBeVisible()

  await page.getByTestId('topic-item-4d0bfef4').click()
  await expect(page.getByTestId('topic-item-New_UI')).toBeVisible()
})

test('correct colors', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await page.getByTestId('topic-item-Configuring_Project_and_IDE_Settings').click()
  await expect(page.getByTestId('topic-item-4d0bfef4')).toHaveClass(/button--highlight-light/)

  await page.getByTestId('topic-item-4d0bfef4').click()
  await expect(page.getByTestId('topic-item-New_UI')).toHaveClass(/button--highlight-dark/)
})

test('persisted topic', async ({ page }) => {
  await page.goto('http://localhost:5173/Run_for_the_first_time')

  await expect(page.getByTestId('topic-item-Run_for_the_first_time')).toBeVisible()
})
