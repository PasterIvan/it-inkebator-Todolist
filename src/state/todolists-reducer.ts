import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {AppThunkType} from "./store";
import {setAppStatusAC} from "./app-reducer";

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const SET_TODOLISTS = 'SET-TODOLISTS'

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof fetchTodolistsAC>

export type ActionsTypeForTodoListsReducer =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType;

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTypeForTodoListsReducer): Array<TodolistDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case ADD_TODOLIST: {
            return ([{...action.todolist, filter: 'all'}, ...state])
        }
        case CHANGE_TODOLIST_TITLE: {
            const todolist = state.find(tl => tl.id === action.todolistId);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case CHANGE_TODOLIST_FILTER: {
            const todolist = state.find(tl => tl.id === action.todolistId);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case SET_TODOLISTS: {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        default:
            return state
    }
}
//AC
export const removeTodolistAC = (todolistId: string) => {
    return {type: REMOVE_TODOLIST, todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: ADD_TODOLIST, todolist} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: CHANGE_TODOLIST_TITLE, todolistId, title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: CHANGE_TODOLIST_FILTER, todolistId, filter} as const
}
export const fetchTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: SET_TODOLISTS, todolists} as const
}

//THUNKS
export const fetchTodolistsTC = (): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await todolistsAPI.getTodolists()
    dispatch(fetchTodolistsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
}

export const addTodoListTC = (title: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await todolistsAPI.createTodolist(title)
    dispatch(addTodolistAC(res.data.data.item))
    dispatch(setAppStatusAC('succeeded'))
}
export const removeTodolistTC = (todolistId: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    res.data.resultCode === 0 &&
    dispatch(removeTodolistAC(todolistId))
    dispatch(setAppStatusAC('succeeded'))
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    await todolistsAPI.updateTodolistTitle(todolistId, title)
    dispatch(changeTodolistTitleAC(todolistId, title))
    dispatch(setAppStatusAC('succeeded'))
}
