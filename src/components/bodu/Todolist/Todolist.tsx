import React from 'react';
import {AddItemForm} from '../../../AddItemForm';
import {EditableSpan} from '../../../EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {FilterValuesType} from "../../../state/todolists-reducer";
import {TaskType} from "../../../api/todolistsAPI";
import {TaskContainer} from "./Tasks/TaskContainer";

type PropsType = {
    title: string
    filter: FilterValuesType
    todolistId: string
    tasks: Array<TaskType>
    removeTodolist: () => void
    changeTodolistTitle: (newTitle: string) => void
    changeTodolistFilter: (newFilter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist: React.FC<PropsType> = React.memo(({title,
                                        filter,
                                        todolistId,
                                        tasks,
                                        changeTodolistTitle,
                                        removeTodolist,
                                        changeTodolistFilter,
                                        addTask}) => {

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks && tasks.map(t => {
                    return <TaskContainer key={t.id} task={t} todolistId={todolistId}/>
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={()=>changeTodolistFilter('all')}
                    color={'default'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={()=>changeTodolistFilter('active')}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={()=>changeTodolistFilter('completed')}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})

