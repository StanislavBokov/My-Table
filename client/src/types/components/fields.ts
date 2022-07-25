export type DataValueField = {
    value: string,
    isBlur: boolean
}
export type DataAddField = {
    [key: string]: DataValueField
}

export type ErrorMessages = {
    [key: string]: string
}
export type Blur = {
    [key: string]: boolean
}