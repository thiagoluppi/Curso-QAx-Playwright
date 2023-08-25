import { expect, APIRequestContext } from "@playwright/test"
import { TaskModel } from "../fixtures/task.model"


export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    await request.delete(`http://localhost:3333/helper/tasks/${taskName}`)
}

export async function postTask(request: APIRequestContext, payload: TaskModel) {
    const result = await request.post('http://localhost:3333/tasks', {
        data: payload
    })
    expect(result.ok()).toBeTruthy

    console.log(`O status code do request é: ${result.status()}`)
    console.log(`O body do request é: ${result.statusText()}`)
    // console.log(`O header do request é: ${result.headers()}`)
    // console.log(`O body do request como text é: ${result.text()}`)
}
