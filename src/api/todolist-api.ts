import axios from 'axios'

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
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
        const promise = instance.get<Array<TodolistType>>(`/todo-lists/`)
        return promise
    },

    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>(`/todo-lists/`, {title: title})
        return promise
    },

    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
        return promise
    },

    updateTodolistTitle(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: title})
        return promise
    },
}