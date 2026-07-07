export interface Nationality {
    id: number;
    name: string;
}


export interface Author {
    id: number;
    name: string;
    born: number;
    died?: number;
    nationalityId: number;
}