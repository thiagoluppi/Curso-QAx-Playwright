import { expect, Locator, Page } from "@playwright/test"
import { TaskModel } from "../../../fixtures/task.model"

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
        await this.page.goto('http://localhost:3000')
    }

    async createTaskFront(payload: TaskModel) {
        await this.inputTaskNameField.fill(payload.name)
        await this.createButton.click()
    }

    async validateCreatedTasks(payload: TaskModel) {
        const taskElement = this.page.locator(`[data-testid="task-item"]:has-text("${payload.name}")`)
        await expect(taskElement).toBeVisible()
    }

    async validateTwiceTasksAlert(alertText: string) {
        const target = this.page.locator('#swal2-html-container')
        await expect(target).toHaveText(alertText)
    }
}