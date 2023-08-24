import { test, expect } from '@playwright/test'
// import { faker } from '@faker-js/faker'


test('Deve poder cadastrar uma nova tarefa @debug @regression', async ({ page, request }) => {

    /*
    Quando você usa await request.delete('someUrl'),
    a resposta da solicitação HTTP DELETE é retornada como um objeto HTTPResponse. 
    Você pode acessar várias informações sobre a resposta HTTP a partir desse objeto.

    Aqui estão alguns exemplos do que você pode acessar usando o objeto HTTPResponse:

    result.status(): retorna o código de status HTTP da resposta.
    result.statusText(): retorna a mensagem de status HTTP da resposta.
    result.headers(): retorna um objeto com os cabeçalhos HTTP da resposta.
    result.text(): retorna o corpo da resposta como uma string.
    result.json(): retorna o corpo da resposta como um objeto JSON.
    Você pode usar console.log(result.<algumaCoisa>) para exibir o valor de uma propriedade específica. 
    Por exemplo, console.log(result.status()) exibirá o código de status HTTP da resposta.
    */

    // console.log(`O status code do request é: ${result.status()}`)
    // console.log(`O body do request é: ${result.statusText()}`)
    // console.log(`O header do request é: ${result.headers()}`)
    // console.log(`O body do request como text é: ${result.text()}`)
    // console.log(`O body do request como json é: ${result.json()}`)

    // console.log('')

    // Dado que eu tenho uma nova tarefa
    const payload = {
        name: 'Cadastro pelo back',
        is_done: false
    }
    // E que eu a cadastre pelo back end
    await request.delete(`http://localhost:3333/helper/tasks/${payload.name}`)

    const result = await request.post('http://localhost:3333/tasks', {
        data: payload
    })
    expect(result.ok()).toBeTruthy

    console.log(`O status code do request é: ${result.status()}`)
    console.log(`O body do request é: ${result.statusText()}`)
    // console.log(`O header do request é: ${result.headers()}`)
    // console.log(`O body do request como text é: ${result.text()}`)


    // E que eu a cadastre pelo front end
    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')

    const taskNameFront = 'Cadastro pelo front'
    await request.delete(`http://localhost:3333/helper/tasks/${taskNameFront}`)
    await inputTaskName.fill(taskNameFront)

    await page.click('css=button >> text=Create')

    // Então essas tarefas devem ser exibidas na lista
    const targetFront = page.locator(`[data-testid="task-item"]:has-text("${taskNameFront}")`)
    await expect(targetFront).toBeVisible()

    const targetBack = page.locator(`[data-testid="task-item"]:has-text("${payload.name}")`)
    await expect(targetBack).toBeVisible()
})

test('não deve permitir tarefa duplicada @debug @regression', async ({ page, request }) => {
    const payload = {
        name: 'Comprar Ketchup',
        is_done: false
    }

    await request.delete(`http://localhost:3333/helper/tasks/${payload.name}`)
    const result = await request.post('http://localhost:3333/tasks', {
        data: payload
    })
    expect(result.ok()).toBeTruthy

    await page.goto('http://localhost:3000')
    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(payload.name)
    await page.click('css=button >> text=Create')

    const target = page.locator('#swal2-html-container')
    await expect(target).toHaveText('Task already exists!')
})
