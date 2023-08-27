import { test, expect } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'

import { deleteTaskByHelper, postTask } from './support/helpers'
import { TaskPage } from './support/pages/tasks'


test('Deve poder cadastrar uma nova tarefa @cadastroSimples @debug @regression', async ({ page, request }) => {

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

    /*
    console.log(`O status code do request é: ${result.status()}`)
    console.log(`O body do request é: ${result.statusText()}`)
    console.log(`O header do request é: ${result.headers()}`)
    console.log(`O body do request como text é: ${result.text()}`)
    console.log(`O body do request como json é: ${result.json()}`)

    console.log('')
    */

    // const taskPage = new TaskPage(page) isso também funciona!
    const taskPage: TaskPage = new TaskPage(page)
    // Dado que eu tenho uma nova tarefa
    const payload: TaskModel = {
        name: 'Cadastro pelo back',
        is_done: false
    }

    // E que eu a cadastre pelo back end
    await deleteTaskByHelper(request, payload.name)
    await postTask(request, payload)

    // E que eu a cadastre pelo front end
    const payloadFront: TaskModel = {
        name: 'Cadastro pelo front',
        is_done: false
    }

    await taskPage.GoToTaskPage()
    await deleteTaskByHelper(request, payloadFront.name)
    await taskPage.createTaskFront(payloadFront)


    // Então essas tarefas devem ser exibidas na lista
    await taskPage.validateCreatedTasks(payloadFront)
    await taskPage.validateCreatedTasks(payload)
})

test('não deve permitir tarefa duplicada @duplicado @debug @regression', async ({ page, request }) => {
    const taskPage: TaskPage = new TaskPage(page)

    const payload: TaskModel = {
        name: 'Comprar Ketchup',
        is_done: false
    }

    await deleteTaskByHelper(request, payload.name)
    await postTask(request, payload)

    await taskPage.GoToTaskPage()
    await taskPage.createTaskFront(payload)
    await taskPage.validateTwiceTasksAlert('Task already exists!')
})
