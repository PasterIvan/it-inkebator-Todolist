import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunkType} from "./store";

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const SET_TASKS = 'SET-TASKS'

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTaskActionType = ReturnType<typeof setTasksAC>

export type ActionTypeForTaskReducer =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTaskActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionTypeForTaskReducer): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(), title: action.title, status: TaskStatuses.New, description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
                    todoListId: action.todolistId
                }, ...state[action.todolistId]]
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            const {[action.id]: [], ...rest} = {...state}
            return rest
        case SET_TASKS: {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: REMOVE_TASK, taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: ADD_TASK, title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: CHANGE_TASK_STATUS, taskId, status, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: CHANGE_TASK_TITLE, taskId, title, todolistId} as const
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: SET_TASKS, todolistId, tasks}
}

export const fetchTasksTC = (todolistId: string): AppThunkType => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.item
            dispatch(setTasksAC(todolistId, tasks))
        })
}

export const createTasksTC = (todolistId: string, title: string): AppThunkType => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then((res) => {
            const task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}

export const removeTasksTC = (taskId: string, todolistId: string): AppThunkType => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
            }
        })
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses): AppThunkType => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
        }
    }
}

