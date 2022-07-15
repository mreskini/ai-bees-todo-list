import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useEffect } from "react"
import CreateTaskModal from "."
import AppProvider, { useApp } from "../../contexts/AppContext"
import TasksProvider from "../../contexts/TasksContext"

// This component is harder to test as we need to access the context but we cannot access that inside the test block,
// that's why we are trying to use Mock Components here.

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
    beforeEach(() => render(<MockCreateTaskModal />))

    it("Has 'Create New Task' subject", () => {
        const element = screen.getByTestId("modal-title")
        expect(element.textContent).toBe("Create New Task")
    })

    // We don't need to test the form UI, as we are doing that in another file.

    // Here we are testing to see if the modal is still on the page after we click the cancel button.
    // because the cancel button is supposed to close the modal.
    it("Cancel button closes the modal", () => {
        const element = screen.getByTestId("modal-cancel")
        userEvent.click(element)
        const title = screen.queryByTestId("modal-title")
        expect(title).not.toBeInTheDocument()
    })

    // We cannot test the add new task process because that would be an integration test, we only want to add simple unit tests for this task.
    // But, we can test the user events like changing the values and ...
    it("Can change the task title input field", () => {
        const titleInput: HTMLInputElement = screen.getByLabelText("Task title")
        fireEvent.change(titleInput, { target: { value: "Hello Foobar" } })
        expect(titleInput.value).toBe("Hello Foobar")
    })

    it("Can change the task description input field", () => {
        const titleInput: HTMLInputElement =
            screen.getByLabelText("Task description")
        fireEvent.change(titleInput, { target: { value: "Hello there" } })
        expect(titleInput.value).toBe("Hello there")
    })
})
