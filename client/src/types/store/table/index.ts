
export type TableDataItem = {
    _id?: string,
    name: string,
    amount: number | string,
    distance: number | string,
    createdAt?: any
}
export type TableDataState = {
    TableData: TableDataItem[],
    loading: boolean | null,
    error: boolean
}
export type EditDataState = {
    id: string, 
    editData: TableDataItem
}