export const filterTextLength = (text: string): string => {
    let result = text.slice(0, 30)
    if (text.length > 30) result += "..."

    return result
}
