import { expect, Page } from "@playwright/test"
import { TaskModel } from "../../../fixtures/task.model"

export class TaskPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async GoToTaskPage() {
        await this.page.goto('http://localhost:3000')
    }

    async createTaskFront(payload: TaskModel) {

        const inputTaskName = this.page.locator('input[class*=InputNewTask]')
        await inputTaskName.fill(payload.name)

        await this.page.click('css=button >> text=Create')
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