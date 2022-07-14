// You can find the Header component tests in here.
// We test different scenarios to make sure the component is fully working.
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import FloatingAddButton from "."

describe("FAB button tests", () => {
    it("Fab button is on the screen", () => {
        render(<FloatingAddButton />)
        const fabElement = screen.getByTestId("fab")
        expect(fabElement).toBeInTheDocument()
    })
})
