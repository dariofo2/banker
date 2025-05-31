export class ListRequestDTO<T> {
    data: T
    page: number;
    limit: number; 

    constructor(data:T,page:number,limit:number) {
        this.data=data;
        this.page=page;
        this.limit=limit;
    }
}