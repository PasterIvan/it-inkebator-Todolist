import axios from 'axios'

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TaskType
    }
}

export type ResponseGetType = {
    item: TaskType
    totalCount: number
    error: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '8eae8561-af9d-4770-a309-d90c99aab1ce',
    }
})

export const taskAPI = {

    getTasks(todolistId: string) {
        const promise = instance.get<ResponseGetType>(`${todolistId}/tasks`)
        return promise
    },

    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseType>(`${todolistId}/tasks`, {title: title})
        return promise
    },

    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
        return promise
    },

    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        const promise = instance.put<ResponseType>(`${todolistId}/tasks/${taskId}`, {title: title})
        return promise
    },
}