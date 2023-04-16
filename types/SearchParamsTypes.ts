type Params = {
    id: string,
}

type SearchParams = {
    name: string,
    image: string,
    id: string,
    unit_amount: number | null,
    description: string | null,
    features: string,
}

export type SearchParamsType = {
    params: Params,
    searchParams: SearchParams,
}