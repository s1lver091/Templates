import { test, expect } from '@playwright/test'

test('homepage carica senza errori', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Studio Name/)
})

test('tutte le sezioni principali sono visibili', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#hero')).toBeVisible()
  await expect(page.locator('#works')).toBeVisible()
  await expect(page.locator('#services')).toBeVisible()
  await expect(page.locator('#about')).toBeVisible()
  await expect(page.locator('#contact')).toBeVisible()
})

test('navbar contiene i link di navigazione', async ({ page }) => {
  await page.goto('/')
  const nav = page.locator('header nav')
  await expect(nav.locator('a[href="#works"]')).toBeVisible()
  await expect(nav.locator('a[href="#contact"]')).toBeVisible()
})

test('form di contatto ha i campi richiesti', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('input[name="name"]')).toBeVisible()
  await expect(page.locator('input[name="email"]')).toBeVisible()
  await expect(page.locator('textarea[name="message"]')).toBeVisible()
})

test('nessun errore di accessibilità base', async ({ page }) => {
  await page.goto('/')
  const imagesWithoutAlt = await page.locator('img:not([alt])').count()
  expect(imagesWithoutAlt).toBe(0)
})
