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
    
    getRecentBooks(count: number): Book[] {
        return this.books.slice(0, count);
    }

    getTopAuthors(count: number): Author[] {
        return this.authors.slice(0, count);
    }

    getPopularSeries(count: number): Series[] {
        return this.series.slice(0, count);
    }

    getAuthor(id: number): Author | undefined {
        return this.authors.find((author) => author.id === id);
    }

    getBooksByAuthor(authorId: number): Book[] {
        return this.books.filter((book) => book.authorId === authorId);
    }

    getRelatedAuthors(authorId: number, count: number): Author[] {
        const author = this.getAuthor(authorId);
        if (!author) {
            return [];
        }

        return this.authors.filter((a) => a.nationalityId === author.nationalityId && a.id !== authorId).slice(0, count);
    }

}