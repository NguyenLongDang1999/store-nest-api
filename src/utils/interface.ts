export interface Paginator {
    page?: number
    pageSize?: number
}

export interface CategoryList {
    id: string
    name: string
    status: number,
    popular: number
    publish: boolean
    image_uri: string
    parentCategory: {
        id: string
        name: string
    }
}
export interface CategorySearch extends Paginator {
    search?: {
        name?: string
        parent_id?: string
        status?: number
        popular?: number
    }
}