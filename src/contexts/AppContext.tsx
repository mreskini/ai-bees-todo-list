import { createContext, useContext, useState } from "react"

type Props = {
    children: JSX.Element
}

interface AppContextInterface {
    isCreateModalOpen: boolean
    setIsCreateModalOpen(value: boolean): void
    handleCreateModalOpen(): void
    handleCreateModalClose(): void
}

const initialContextValue = {
    isCreateModalOpen: false,
    setIsCreateModalOpen: () => undefined,
    handleCreateModalOpen: () => undefined,
    handleCreateModalClose: () => undefined,
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

    // Methods
    const handleCreateModalOpen = () => setIsCreateModalOpen(true)
    const handleCreateModalClose = () => setIsCreateModalOpen(false)

    // Binding
    const value = {
        // States
        isCreateModalOpen,
        setIsCreateModalOpen,

        // Methods
        handleCreateModalOpen,
        handleCreateModalClose,
    }

    // Render
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
