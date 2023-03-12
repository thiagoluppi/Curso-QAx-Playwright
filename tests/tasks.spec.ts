import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'


test('Deve poder cadastrar uma nova tarefa @debug', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(faker.lorem.paragraph())

    // Usando xpath:
    // await page.click('xpath=//button[contains(text(), "Create")]')

    await page.click('css=button >> text=Create')
})
