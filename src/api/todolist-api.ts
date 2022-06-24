import axios from 'axios'

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

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

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type GetResponseType = {
    item: TaskType
    totalCount: number
    error: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8eae8561-af9d-4770-a309-d90c99aab1ce',
    }
})

export const todolistAPI = {

    getTodolists() {
        return instance.get<Array<TodolistType>>(`/todo-lists/`)
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`/todo-lists/`, {title: title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },

    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: title})
    },
}


export const taskAPI = {

    getTasks(todolistId: string) {
        return instance.get<GetResponseType>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    },
}