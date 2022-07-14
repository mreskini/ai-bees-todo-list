// You can find the Header component tests in here.
// We test different scenarios to make sure the component is fully working.
import Header from "."
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("Header component tests", () => {
    it("Has 'hello world' title", () => {
        render(<Header />)
        const titleElement = screen.queryByText("Hello World")
        expect(titleElement).toBeInTheDocument()
    })
    it("Has no 'VIEW DONE TASKS' button before the first task is created", () => {
        render(<Header />)
        const buttonElement = screen.queryByText("VIEW DONE TASKS")
        expect(buttonElement).not.toBeInTheDocument()
    })
})
