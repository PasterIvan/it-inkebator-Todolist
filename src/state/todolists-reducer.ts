import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId1)
        }
        case'ADD-TODOLIST': {
            let newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        }
        case'CHANGE-TODOLIST-TITLE': {

            return state.map(el=>el.id === action.payload.todolistId2 ? {...el, title: action.payload.newTodolistTitle} : el )
        }
        case'CHANGE-TODOLIST-FILTER': {

            return state.map(el=>el.id === action.payload.id ? {...el, filter: action.payload.filter}: el)
        }
        default:
            return state
    }
}

type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeFilterACACType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId1}
    } as const
}

export const addTodolistAC = (id: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {id, title}
    } as const
}

export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId2, newTodolistTitle}
    } as const
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}

