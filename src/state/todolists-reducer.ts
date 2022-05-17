import {FilterValuesType, TodolistType} from "../App";

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId1)
        }
        case'ADD-TODOLIST': {
            let newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        }
        case'CHANGE-TODOLIST-TITLE': {
            return state.map(el=>el.id === action.payload.id ? {...el, title: action.payload.title} : el )
        }
        case'CHANGE-TODOLIST-FILTER': {
            return state.map(el=>el.id === action.payload.id ? {...el, filter: action.payload.filter}: el)
        }
        default:
            return state
    }
}

type ActionsType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACACType

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

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}
    } as const
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}

