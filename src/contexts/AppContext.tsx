import { createContext, useContext, useState } from "react"
import { Task } from "./TasksContext"

type Props = {
    children: JSX.Element
}

interface AppContextInterface {
    isCreateModalOpen: boolean
    isDetailsModalOpen: boolean
    isEditModalOpen: boolean
    isDoneTasksModalOpen: boolean
    currentTask: Task | undefined | null

    setIsCreateModalOpen(value: boolean): void
    setIsDetailsModalOpen(value: boolean): void
    setIsEditModalOpen(value: boolean): void
    setCurrentTask(task: Task): void

    handleCreateModalOpen(): void
    handleCreateModalClose(): void

    handleDetailsModalOpen(task: Task): void
    handleDetailsModalClose(): void

    handleEditModalOpen(task: Task): void
    handleEditModalClose(): void

    handleDoneTasksClose(): void
    handleDoneTasksOpen(): void
}

const initialContextValue = {
    isCreateModalOpen: false,
    isDetailsModalOpen: false,
    isEditModalOpen: false,
    isDoneTasksModalOpen: false,
    currentTask: null,

    setIsCreateModalOpen: () => undefined,
    setIsDetailsModalOpen: () => undefined,
    setIsEditModalOpen: () => undefined,
    setCurrentTask: () => undefined,

    handleCreateModalOpen: () => undefined,
    handleCreateModalClose: () => undefined,

    handleDetailsModalOpen: () => undefined,
    handleDetailsModalClose: () => undefined,

    handleEditModalOpen: () => undefined,
    handleEditModalClose: () => undefined,

    handleDoneTasksOpen: () => undefined,
    handleDoneTasksClose: () => undefined,
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
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [isDoneTasksModalOpen, setIsDoneTaskModalOpen] =
        useState<boolean>(false)
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
    const handleEditModalOpen = (task: Task) => {
        setCurrentTask(task)
        setIsEditModalOpen(true)
    }

    const handleEditModalClose = () => setIsEditModalOpen(false)
    const handleDoneTasksOpen = () => setIsDoneTaskModalOpen(true)
    const handleDoneTasksClose = () => setIsDoneTaskModalOpen(false)

    // Binding
    const value = {
        // States
        isCreateModalOpen,
        isDetailsModalOpen,
        isEditModalOpen,
        isDoneTasksModalOpen,
        currentTask,

        setIsCreateModalOpen,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
        setIsDoneTaskModalOpen,
        setCurrentTask,

        // Methods
        handleCreateModalOpen,
        handleCreateModalClose,
        handleDetailsModalOpen,
        handleDetailsModalClose,
        handleEditModalOpen,
        handleEditModalClose,
        handleDoneTasksOpen,
        handleDoneTasksClose,
    }

    // Render
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
