import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {tasksAPI, TasksStateType, TaskStatuses, TaskType} from "../api/todolistsAPI";
import {AppRootStateType, AppThunkType} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError} from "../utils/error-utils";

const REMOVE_TASK = 'REMOVE_TASK'
const CREATE_TASK = 'CREATE_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const SET_TASKS = 'SET_TASKS'

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof createTaskAC>
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

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypeForTaskReducer): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.id);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case CREATE_TASK:
            return {
                ...state,
                [action.todolistId]: [action.task, ...state[action.todolistId]]
            }
        case CHANGE_TASK_STATUS: {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.id ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case CHANGE_TASK_TITLE: {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.id ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        case SET_TASKS:
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}
//AC
export const removeTaskAC = (todolistId: string, id: string) => {
    return {type: REMOVE_TASK, todolistId, id} as const
}
export const createTaskAC = (todolistId: string, task: TaskType) => {
    return {type: CREATE_TASK, todolistId, task} as const
}
export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses) => {
    return {type: CHANGE_TASK_STATUS, todolistId, id, status} as const
}
export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => {
    return {type: CHANGE_TASK_TITLE, todolistId, id, title} as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: SET_TASKS, todolistId, tasks} as const
}

//THUNKS
export const fetchTasksTC = (todolistId: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await tasksAPI.getTasks(todolistId)
    dispatch(setTasksAC(todolistId, res.data.items))
    dispatch(setAppStatusAC('succeeded'))
}

export const createTaskTC = (todolistId: string, title: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await tasksAPI.createTask(todolistId, title)
    if (res.data.resultCode === 0) {
        dispatch(createTaskAC(todolistId, res.data.data.item))
    } else {
        handleServerAppError(res.data, dispatch)
    }
    dispatch(setAppStatusAC('succeeded'))
}

export const removeTasksTC = (id: string, todolistId: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await tasksAPI.deleteTask(todolistId, id)
    if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(todolistId, id))
    } else {
        handleServerAppError(res.data, dispatch)
    }
    dispatch(setAppStatusAC('succeeded'))
}

export const updateTaskStatusTC = (todolistId: string, id: string, status: TaskStatuses): AppThunkType =>
    async (dispatch,
           getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC('loading'))

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === id
        })

        if (task) {
            const res = await tasksAPI.updateTask(todolistId, id, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
            if (res.data.resultCode === 0) {
                dispatch(changeTaskStatusAC(todolistId, id, status))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export const updateTaskTitleTC = (todolistId: string, id: string, title: string): AppThunkType =>
    async (dispatch,
           getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC('loading'))

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === id)

        if (task) {
            const res = await tasksAPI.updateTask(todolistId, id, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            })
            if (res.data.resultCode === 0) {
                dispatch(changeTaskTitleAC(todolistId, id, title))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppStatusAC('succeeded'))
        }
    }