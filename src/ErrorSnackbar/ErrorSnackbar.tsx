import React from "react"
import {AlertProps} from "@mui/material";
import { useAppSelector } from "../hooks/hooks";
import {useAppDispatch} from "../hooks/hooks";
import { setAppErrorAC } from "../state/app-reducer";
import {Snackbar} from "@material-ui/core";
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {

    const dispatch = useAppDispatch()
    const error = useAppSelector((state) => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}