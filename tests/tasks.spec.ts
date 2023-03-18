import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'


test('Deve poder cadastrar uma nova tarefa @debug @regression', async ({ page, request }) => {
    const taskName = 'teste'

    await request.delete(`http://localhost:3333/helper/tasks/${taskName}`)

    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')


    await inputTaskName.fill(taskName)
    // Usando o faker.lorem.paragraph ele acaba criando textos muitos grandes, então vamos mudar:
    // await inputTaskName.fill(faker.lorem.words())

    // Usando xpath:
    // await page.click('xpath=//button[contains(text(), "Create")]')

    await page.click('css=button >> text=Create')
})
