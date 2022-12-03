export interface Paginator {
    rows?: number
    first?: number
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