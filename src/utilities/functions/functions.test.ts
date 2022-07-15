import "@testing-library/jest-dom"
import { filterTextLength } from "./filterTextLength"

describe("Utility Functions test", () => {
    it("Filters a very long text", () => {
        const inputString =
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        const filteredText = filterTextLength(inputString)
        expect(filteredText).toBe("Lorem Ipsum is simply dummy te...")
    })
    it("Filters a very short text", () => {
        const inputString = "Lorem Ipsum is"
        const filteredText = filterTextLength(inputString)
        expect(filteredText).toBe("Lorem Ipsum is")
    })
    it("Filters a 30-char length text", () => {
        const inputString = "12345 12345 12345 12345 123451"
        const filteredText = filterTextLength(inputString)
        expect(filteredText).toBe("12345 12345 12345 12345 123451")
    })
    it("Filters a 31-char length text", () => {
        const inputString = "12345 12345 12345 12345 12345 1"
        const filteredText = filterTextLength(inputString)
        expect(filteredText).toBe("12345 12345 12345 12345 12345 ...")
    })
})
