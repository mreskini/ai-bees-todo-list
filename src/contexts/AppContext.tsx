import { createContext, useContext, useState } from "react"
import { Task } from "./TasksContext"

type Props = {
    children: JSX.Element
}

interface AppContextInterface {
    isCreateModalOpen: boolean
    isDetailsModalOpen: boolean
    currentTask: Task | undefined | null

    setIsCreateModalOpen(value: boolean): void
    setIsDetailsModalOpen(value: boolean): void
    setCurrentTask(task: Task): void

    handleCreateModalOpen(): void
    handleCreateModalClose(): void
    handleDetailsModalOpen(task: Task): void
    handleDetailsModalClose(): void
}

const initialContextValue = {
    isCreateModalOpen: false,
    isDetailsModalOpen: false,
    currentTask: null,

    setIsCreateModalOpen: () => undefined,
    setIsDetailsModalOpen: () => undefined,
    setCurrentTask: () => undefined,

    handleCreateModalOpen: () => undefined,
    handleCreateModalClose: () => undefined,
    handleDetailsModalOpen: () => undefined,
    handleDetailsModalClose: () => undefined,
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
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
    const [currentTask, setCurrentTask] = useState<Task | undefined | null>(
        null
    )

    // Methods
    const handleCreateModalOpen = () => setIsCreateModalOpen(true)
    const handleCreateModalClose = () => setIsCreateModalOpen(false)
    const handleDetailsModalOpen = (task: Task) => {
        setCurrentTask(task)
        setIsDetailsModalOpen(true)
    }

    const handleDetailsModalClose = () => setIsDetailsModalOpen(false)

    // Binding
    const value = {
        // States
        isCreateModalOpen,
        isDetailsModalOpen,
        currentTask,

        setIsCreateModalOpen,
        setIsDetailsModalOpen,
        setCurrentTask,

        // Methods
        handleCreateModalOpen,
        handleCreateModalClose,
        handleDetailsModalOpen,
        handleDetailsModalClose,
    }

    // Render
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
