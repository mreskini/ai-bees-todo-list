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

interface AppContextInterface {
    tasksList: Task[]
    setTasksList(list: Task[]): void
    addNewTask(
        title: string,
        description: string,
        targets: string,
        priority: Priority,
        status: Status
    ): void
    getTaskByToken(token: string): Task
    doneTaskByToken(token: string): void
}

const initialContextValue = {
    tasksList: [],
    setTasksList: () => undefined,
    addNewTask: () => undefined,
    getTaskByToken: () => {
        const task: Task = {
            token: "TOKEN",
            title: "TITLE",
            description: "DESCRIPTION",
            targets: "TARGETS",
            priority: "LOW",
            status: "DONE",
        }
        return task
    },
    doneTaskByToken: () => undefined,
}

const AppContext = createContext<AppContextInterface>(initialContextValue)

// It's better to export a hook and use that instead of using the Context itself in other files.
// (It's one of them best practices)
export const useApp = () => {
    // One of the best practices about context is to make sure that the hook is being called in the right place
    // and not someplace random in the application that makes debugging harder.
    const context = useContext(AppContext)
    if (!context) throw new Error("useApp must be used within a AppContext")
    return context
}

const AppProvider: React.FC<Props> = ({ children }) => {
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
            {
                token: uuid(),
                title,
                description,
                targets,
                priority,
                status,
            },
            ...tasksList,
        ])
    }
    const getTaskByToken = (token: string): Task => {
        const task = tasksList.filter(item => item.token === token)[0]
        return task
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
        getTaskByToken,
        doneTaskByToken,
    }

    // Render
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
