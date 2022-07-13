import { createContext, useContext, useState } from "react"

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
    setTasksList(list: Task[]): void
}

const initialContextValue = {
    tasksList: [],
    setTasksList: (list: Task[]) => undefined,
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

    // Binding
    const value = {
        tasksList,
        setTasksList,
    }

    // Render
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
