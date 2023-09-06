import { expect, Locator, Page } from "@playwright/test"
import { TaskModel } from "../../../fixtures/task.model"

require('dotenv').config()

const BASE_API = process.env.BASE_API

export class TaskPage {
    readonly page: Page
    readonly inputTaskNameField: Locator
    readonly createButton: Locator

    constructor(page: Page) {
        this.page = page
        this.inputTaskNameField = this.page.locator('input[class*=InputNewTask]')
        this.createButton = this.page.locator('css=button >> text=Create')
    }

    async GoToTaskPage() {
        await this.page.goto('/')
    }

    async createTaskFront(payload: TaskModel) {
        await this.inputTaskNameField.fill(payload.name)
        await this.createButton.click()
    }


    async createTaskFrontForInterception(payload: TaskModel) {

        await this.page.route(`${BASE_API}/tasks`, route => {
            console.log("Interceptação para ", BASE_API)

            const request = route.request()
            const postData = request.postData()

            console.log("Dados POST recebidos: ", postData)

            if (postData) {
                try {
                    const requestData = JSON.parse(postData)
                    console.log("Dados da requisição: ", requestData)

                    expect(requestData.name === payload.name && requestData.is_done === payload.is_done)

                    if (requestData.name === payload.name && requestData.is_done === payload.is_done) {
                        console.log("Dados da requisição estão corretos!")
                    } else {
                        console.log("Dados da requisição não correspondem ao esperado!")
                    }
                } catch (error) {
                    console.error("Erro ao analisar os dados da requisição: ", error.message)
                }
            } else {
                console.log("Sem dados no corpo da requisição!")
            }
            // Continue com a requisição
            route.continue()
        })
        // Preencha o campo de tarefa e clique no botão
        await this.inputTaskNameField.fill(payload.name)
        await this.createButton.click()

        // Parando a interceptação:
        await this.page.unroute(`${BASE_API}/tasks`)
    }

    async toggle(taskName: string) {
        // O papito usou Xpath:
        // const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`)
        const taskItemLocator = this.page.locator(`[data-testid="task-item"]:has-text("${taskName}")`)
        const toggleButton = taskItemLocator.locator('button:nth-child(1)')
        await toggleButton.click()
    }

    async deleteTask(taskName: string) {
        // O papito usou Xpath:
        // const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`)
        const taskItemLocator = this.page.locator(`[data-testid="task-item"]:has-text("${taskName}")`)
        const deleteButton = taskItemLocator.locator('button:has([xmlns="http://www.w3.org/2000/svg"])')

        // Esperar até que o botão esteja visível
        await deleteButton.waitFor({ state: 'visible' })

        // Clicar no botão
        await deleteButton.click()
    }

    async validateCreatedTasks(payload: TaskModel) {
        const taskElement = this.page.locator(`[data-testid="task-item"]:has-text("${payload.name}")`)
        await expect(taskElement).toBeVisible()
    }

    async validateTwiceTasksAlert(alertText: string) {
        const target = this.page.locator('#swal2-html-container')
        await expect(target).toHaveText(alertText)
    }

    async validateToggleButton(taskName: string) {
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }

    async validateDeletedTask(taskName: string) {
        const target = this.page.getByText(taskName)
        await expect(target).not.toBeVisible()
    }
}
