import {ActionTypeForTaskReducer, tasksReducer} from './tasks-reducer'
import {ActionsTypeForTodoListsReducer, todolistsReducer} from './todolists-reducer'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = ActionTypeForTaskReducer | ActionsTypeForTodoListsReducer

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store