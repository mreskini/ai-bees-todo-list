// You can find the Header component tests in here.
// We test different scenarios to make sure the component is fully working.
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { useState } from "react"
import TaskForm from "."
import { Priority } from "../../contexts/TasksContext"

// We need to access the states so that's why we need a simple MockComponent thing for this purpose.
// This component itself has no functionality, so we need to just test the UI in this file, but we will test the functionality
// in other files later on.
const MockTaskForm = () => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [targets, setTargets] = useState<string>("")
    const [priority, setPriority] = useState<Priority>("LOW")

    // Methods
    const resetForm = () => {
        setTitle("")
        setDescription("")
        setTargets("")
        setPriority("LOW")
    }

    const addToTasksButtonClicked = () => {
        resetForm()
    }

    return (
        <TaskForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            targets={targets}
            setTargets={setTargets}
            priority={priority}
            setPriority={setPriority}
            handleAction={addToTasksButtonClicked}
            handleClose={() => {}}
            actionLabel="Create Task"
        />
    )
}

describe("TaskForm component tests", () => {
    beforeEach(() => render(<MockTaskForm />))

    it("Has title input field", () => {
        const element = screen.queryByLabelText("Task title")
        expect(element).toBeInTheDocument()
    })
    it("Has description input field", () => {
        const element = screen.queryByLabelText("Task description")
        expect(element).toBeInTheDocument()
    })
    it("Has targets input field", () => {
        const element = screen.queryByLabelText("Gift and KPI for this task ;)")
        expect(element).toBeInTheDocument()
    })
    it("Has 'Low' radio option", () => {
        const element = screen.queryByLabelText("Low")
        expect(element).toBeInTheDocument()
    })
    it("Has 'Medium' radio option", () => {
        const element = screen.queryByLabelText("Medium")
        expect(element).toBeInTheDocument()
    })
    it("Has 'High' radio option", () => {
        const element = screen.queryByLabelText("High")
        expect(element).toBeInTheDocument()
    })

    // And so on.... we can check all the things on the screen and make sure that they are there.
})
