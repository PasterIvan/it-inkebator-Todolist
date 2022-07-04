import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {tasksAPI, TaskStatuses, TaskType} from "../api/todolistsAPI";
import {AppRootStateType, AppThunkType} from "./store";

const REMOVE_TASK = 'REMOVE_TASK'
const CREATE_TASK = 'CREATE_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const SET_TASKS = 'SET-TASKS'

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
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case CREATE_TASK: {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case CHANGE_TASK_STATUS: {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case CHANGE_TASK_TITLE: {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

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
            delete copyState[action.id];
            return copyState;
        }
        case SET_TASKS: {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: REMOVE_TASK, todolistId, taskId} as const
}
export const createTaskAC = (task: TaskType) => {
    return {type: CREATE_TASK, task} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: CHANGE_TASK_STATUS, taskId, status, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: CHANGE_TASK_TITLE, taskId, title, todolistId} as const
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: SET_TASKS, todolistId, tasks} as const
}

export const fetchTasksTC = (todolistId: string): AppThunkType => async dispatch => {
    const res = await tasksAPI.getTasks(todolistId)
    const tasks = res.data.item
    dispatch(setTasksAC(todolistId, tasks))
}

export const createTaskTC = (todolistId: string, title: string): AppThunkType => async dispatch => {
    const res = await tasksAPI.createTask(todolistId, title)
    const task = res.data.data.item
    dispatch(createTaskAC(task))
}

export const removeTasksTC = (taskId: string, todolistId: string): AppThunkType => async dispatch => {
    const res = await tasksAPI.deleteTask(todolistId, taskId)
    res.data.resultCode === 0 &&
    dispatch(removeTaskAC(todolistId, taskId))
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses): AppThunkType => {
    return (dispatch,
            getState: () => AppRootStateType) => {

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

