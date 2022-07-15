import {Dispatch} from 'redux'
import {authAPI, LoginParamsType} from '../api/todolistsAPI';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {AxiosError} from "axios";
import {AppThunkType} from "./store";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.login(data)

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}
export const logoutTC = (): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.logout()

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType