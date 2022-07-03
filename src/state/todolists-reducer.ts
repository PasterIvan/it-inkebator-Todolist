import {v1} from 'uuid';
import {TodolistType, todolistsAPI} from "../api/todolists-a-p-i";
import {Dispatch} from "redux";

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
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType | SetTodolistsActionType;

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.id)
        }
        case ADD_TODOLIST: {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case CHANGE_TODOLIST_TITLE: {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case CHANGE_TODOLIST_FILTER: {
            const todolist = state.find(tl => tl.id === action.id);
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

export const removeTodolistAC = (todolistId: string) => {
    return {type: REMOVE_TODOLIST, id: todolistId}
}
export const addTodolistAC = (title: string) => {
    return {type: ADD_TODOLIST, title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: CHANGE_TODOLIST_TITLE, id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: CHANGE_TODOLIST_FILTER, id: id, filter: filter}
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: SET_TODOLISTS, todolists}
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then((res)=>
            dispatch(setTodolistsAC(res.data))
        )
}
