import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},//0
        {id: todolistID2, title: 'What to buy', filter: 'all'},//1
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const addTodolost = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistId]: []})
    }

    const removeTodolist = (todolistsID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistsID))
        delete tasks[todolistsID]
    }

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }

    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }

    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    const changeTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolost}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((el, index) => {
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={el.id}
                                    todolistID={el.id}
                                    title={el.title}
                                    tasks={tasks[el.id]}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={el.filter}
                                    setTodolists={setTodolists}
                                    todolists={todolists}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
