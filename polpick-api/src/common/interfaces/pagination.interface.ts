export interface IPagination {
    page: number;
    limit: number;
    sort: { field: string, order: "asc" | "desc" };
}