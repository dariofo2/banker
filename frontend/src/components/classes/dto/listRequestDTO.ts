export class ListRequestDTO<T> {
    data: T
    page: number;
    limit: number; 
}