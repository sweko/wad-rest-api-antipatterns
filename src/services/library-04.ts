import { Author, Nationality } from "../models/author";
import { Book, Series } from "../models/book";

export class LibraryService {
    
    authors: Author[] = [];
    nationalities: Nationality[] = [];
    books: Book[] = [];
    series: Series[] = [];

    constructor() {
       this.seedData();
    }

    seedData() {
        const authorData = require('../../data/authors.json');
        const bookData = require('../../data/books.json');
        this.authors = authorData.authors;
        this.nationalities = authorData.nationalities;

        this.books = bookData.books;
        this.series = bookData.series;
    }

    updateBookStatus(id: number, status: string, userId: number | null): Book | null {
        const book = this.books.find(b => b.id === id);
        if (!book) {
            return null;
        }

        // actual updating here

        return book;
    }

    updateAuthorStatus(id: number, status: string): Author | null {
        const author = this.authors.find(a => a.id === id);
        if (!author) {
            return null;
        }

        // actual updating here

        return author;
    }
    


}