export type ApiResponseType = {
    message?: string;
    data: Record<string, any> | Record<string, any>[];
    success?: boolean;
    token?: string;
    [key: string]: any;
}

export type ApiPaginatedResponseType<T> = {
    success: boolean;
    data: Array<T>;
    total: number;
    limit: number;
    page: number;
    pages: number;
    message: string;
}