import { createContext, FunctionComponent, useContext, useState } from "react"

type Props = {
    children: JSX.Element
}

export type Priority = {}
export type Task = {
    title: string
    description: string
}

interface AppContextInterface {
    tasksList: Task[]
    setTasksList(TasksList: Task[]): void
}

const initialContextValue = {
    tasksList: [],
    setTasksList: ([]) => undefined,
}

const AppContext = createContext<AppContextInterface>(initialContextValue)

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) throw new Error("useApp must be used within a AppContext")
    return context
}

const AppProvider: React.FC<Props> = ({ children }) => {
    // States and Hooks
    const [tasksList, setTasksList] = useState<Task[]>([])

    // Methods

    // Binding
    const value = {
        tasksList,
        setTasksList,
    }

    // Render
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
