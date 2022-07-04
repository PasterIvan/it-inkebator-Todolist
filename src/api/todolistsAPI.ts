import axios, {AxiosResponse} from 'axios'

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
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

export type GetTaskResponseType = {
    item: TaskType[]
    totalCount: number
    error: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '49e19b54-12f4-44c4-af64-14bf246effef',
    }
})

export const todolistsAPI = {

    getTodolists() {
        return instance.get<Array<TodolistType>>(`/todo-lists/`)
    },

    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title});
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },

    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title});
    },
}

export const tasksAPI = {

    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}