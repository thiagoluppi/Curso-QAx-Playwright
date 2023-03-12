import { test, expect } from '@playwright/test'


test('Deve poder cadastrar uma nova tarefa @debug', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.fill('input[class*=InputNewTask]', 'Ler um livro sobre Playwright')
})