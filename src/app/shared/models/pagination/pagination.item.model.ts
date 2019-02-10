
export class PaginationItem {
    index: number;
    name: string;

    // if the item is type numeric page
    numeric: boolean;

    // representing state of item, include ENABLED, DISABLED, HIDDEN, VISIBLE
    status: string;

    constructor(name: string, status: string) {
        this.name = name;
        this.status = status;
    }


}


