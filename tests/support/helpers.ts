import { expect, APIRequestContext } from "@playwright/test"
import { TaskModel } from "../fixtures/task.model"

require('dotenv').config()

const BASE_API = process.env.BASE_API


export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    await request.delete(`${BASE_API}/helper/tasks/${taskName}`)
}

export async function postTask(request: APIRequestContext, payload: TaskModel) {
    const result = await request.post(`${BASE_API}/tasks`, {
        data: payload
    })
    expect(result.ok()).toBeTruthy

    console.log(`O status code do request é: ${result.status()}`)
    console.log(`O body do request é: ${result.statusText()}`)
    // console.log(`O header do request é: ${result.headers()}`)
    // console.log(`O body do request como text é: ${result.text()}`)
}
