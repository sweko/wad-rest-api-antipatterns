export interface Series 
{
    id: number;
    name: string;
}

export interface Book 
{
    id: number;
    title: string;
    authorId: number;
    seriesId?: number;
    seriesNumber?: number;
    publicationYear: number;
}