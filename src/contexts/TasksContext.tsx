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
    const [tasksList, setTasksList] = useState<Task[]>([
        {
            token: "0fa49501-c2f7-4d7b-929c-9bf435e24877",
            title: "aaa",
            description: "aaaa",
            targets: "aaa",
            priority: "MEDIUM",
            status: "OPEN",
        },
        {
            token: "41f3f300-3b9b-43a4-b8b5-8fc1f61603e4",
            title: "fff",
            description: "fff",
            targets: "fff",
            priority: "HIGH",
            status: "OPEN",
        },
        {
            token: "8af76992-7b62-4664-846e-d003732f8270",
            title: "fff",
            description: "fff",
            targets: "ffff",
            priority: "MEDIUM",
            status: "OPEN",
        },
        {
            token: "76ed3833-e03c-49d2-af65-8a910d86da20",
            title: "fff",
            description: "fffff",
            targets: "",
            priority: "MEDIUM",
            status: "OPEN",
        },
        {
            token: "ddfe8072-f837-47f0-bff6-77930dcfc8ab",
            title: "aaaa",
            description: "ddddd",
            targets: "",
            priority: "LOW",
            status: "OPEN",
        },
        {
            token: "ffa4fa66-b356-4b84-bdef-e05379f1e907",
            title: "Mohammad",
            description: "Eskini Is here\n",
            targets: "targets will go here",
            priority: "HIGH",
            status: "DONE",
        },
    ])

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
