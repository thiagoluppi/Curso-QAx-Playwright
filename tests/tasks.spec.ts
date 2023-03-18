import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'


test('Deve poder cadastrar uma nova tarefa @debug @regression', async ({ page, request }) => {
    let taskName = 'teste'

    let result = await request.delete(`http://localhost:3333/helper/tasks/${taskName}`)
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

    console.log(`O status code do request é: ${result.status()}`)
    console.log(`O body do request é: ${result.statusText()}`)
    // console.log(`O header do request é: ${result.headers()}`)
    // console.log(`O body do request como text é: ${result.text()}`)
    // console.log(`O body do request como json é: ${result.json()}`)

    // console.log('')


    taskName = 'Cadastro pelo back'
    await request.delete(`http://localhost:3333/helper/tasks/${taskName}`)

    const postData = {
        name: 'Cadastro pelo back',
        is_done: false
    }

    result = await request.post('http://localhost:3333/tasks', {
        data: postData
    })

    console.log(`O status code do request é: ${result.status()}`)
    console.log(`O body do request é: ${result.statusText()}`)
    // console.log(`O header do request é: ${result.headers()}`)
    // console.log(`O body do request como text é: ${result.text()}`)



    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')

    taskName = 'Cadastro pelo front'
    await inputTaskName.fill(taskName)



    // Usando o faker.lorem.paragraph ele acaba criando textos muitos grandes, então vamos mudar:
    // await inputTaskName.fill(faker.lorem.words())

    // Usando xpath:
    // await page.click('xpath=//button[contains(text(), "Create")]')



    await page.click('css=button >> text=Create')
})
