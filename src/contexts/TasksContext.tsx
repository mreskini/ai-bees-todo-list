import { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"

type Props = {
    children: JSX.Element
}

export type Status = "OPEN" | "DONE"
export type Priority = "HIGH" | "MEDIUM" | "LOW"

export type Task = {
    token: string
    title: string
    description: string
    targets: string
    priority: Priority
    status: Status
}

interface TasksContextInterface {
    tasksList: Task[]
    setTasksList(list: Task[]): void
    addNewTask(
        title: string,
        description: string,
        targets: string,
        priority: Priority,
        status: Status
    ): void
    doneTaskByToken(token: string): void
    deleteTaskByToken(token: string): void
    editTask(
        token: string,
        title: string,
        description: string,
        targets: string,
        priority: Priority
    ): void
}

const initialContextValue = {
    tasksList: [],
    setTasksList: () => undefined,
    addNewTask: () => undefined,
    doneTaskByToken: () => undefined,
    deleteTaskByToken: () => undefined,
    editTask: () => undefined,
}

// We export this to use for the testing purposes
export const TasksContext =
    createContext<TasksContextInterface>(initialContextValue)

// It's better to export a hook and use that instead of using the Context itself in other files.
// (It's one of them best practices)
export const useTasks = () => {
    // One of the best practices about context is to make sure that the hook is being called in the right place
    // and not someplace random in the application that makes debugging harder.
    const context = useContext(TasksContext)
    if (!context) throw new Error("useTasks must be used within a TasksContext")
    return context
}

const TasksProvider: React.FC<Props> = ({ children }) => {
    // States and Hooks
    const [tasksList, setTasksList] = useState<Task[]>([])

    // Methods
    const addNewTask = (
        title: string,
        description: string,
        targets: string,
        priority: Priority,
        status: Status
    ): void => {
        setTasksList([
            ...tasksList,
            {
                token: uuid(),
                title,
                description,
                targets,
                priority,
                status,
            },
        ])
    }
    const doneTaskByToken = (token: string): void => {
        const updatedTasksList = tasksList.map(item => {
            if (token === item.token) {
                item.status = "DONE"
                return item
            }
            return item
        })
        setTasksList(updatedTasksList)
    }

    const deleteTaskByToken = (token: string): void => {
        const updatedTasksList = tasksList.filter(task => task.token !== token)
        setTasksList(updatedTasksList)
    }
    const editTask = (
        token: string,
        title: string,
        description: string,
        targets: string,
        priority: Priority
    ): void => {
        const updatedTasksList = tasksList.map(task => {
            if (task.token === token) {
                task.title = title
                task.description = description
                task.targets = targets
                task.priority = priority
            }
            return task
        })
        setTasksList(updatedTasksList)
    }

    useEffect(() => {
        console.log(tasksList)
    }, [tasksList])

    // Binding
    const value = {
        // States
        tasksList,
        setTasksList,

        // Methods
        addNewTask,
        doneTaskByToken,
        deleteTaskByToken,
        editTask,
    }

    // Render
    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    )
}

export default TasksProvider
