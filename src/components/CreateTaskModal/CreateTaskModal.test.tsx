import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useEffect } from "react"
import CreateTaskModal from "."
import AppProvider, { useApp } from "../../contexts/AppContext"
import TasksProvider from "../../contexts/TasksContext"

// This component is tricky and harder to i
const MockCreateTaskModal = () => {
    return (
        <TasksProvider>
            <AppProvider>
                <CustomCreateTaskModal />
            </AppProvider>
        </TasksProvider>
    )
}
const CustomCreateTaskModal = () => {
    const { setIsCreateModalOpen } = useApp()

    useEffect(() => {
        setIsCreateModalOpen(true)
    }, [])
    return <CreateTaskModal />
}
describe("CreateTaskModal component tests", () => {
    it("Has 'Create New Task' subject", () => {
        render(<MockCreateTaskModal />)
        const element = screen.getByTestId("modal-title")
        expect(element.textContent).toBe("Create New Task")
    })

    // We don't need to test the form UI, as we are doing that in another file.

    // Here we are testing to see if the modal is still on the page after we click the cancel button.
    // because the cancel button is supposed to close the modal.
    it("Cancel button closes the modal", () => {
        render(<MockCreateTaskModal />)
        const element = screen.getByTestId("modal-cancel")
        userEvent.click(element)
        const title = screen.queryByTestId("modal-title")
        expect(title).not.toBeInTheDocument()
    })
})
