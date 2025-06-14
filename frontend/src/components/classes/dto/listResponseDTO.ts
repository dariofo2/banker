export class ListResponseDTO<T> {
    data?: T;
    page?: number;
    limit?: number;
    filteredRecords?: number;
    totalRecords?: number;
}