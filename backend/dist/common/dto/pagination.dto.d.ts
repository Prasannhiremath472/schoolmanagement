export declare class PaginationDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export declare function getPaginationArgs(dto: Pick<PaginationDto, 'page' | 'limit'>): {
    skip: number;
    take: number;
};
export declare function buildPaginationMeta(total: number, pagination: Pick<PaginationDto, 'page' | 'limit'>): {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};
