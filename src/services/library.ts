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

    getAuthors(): Author[] {
        return this.authors;
    }

    getAuthor(id: number): Author | undefined {
        return this.authors.find((author) => author.id === id);
    }

    getNationalities(): Nationality[] {
        return this.nationalities;
    }

    getNationality(id: number): Nationality | undefined {
        return this.nationalities.find((nationality) => nationality.id === id);
    }

    getBooks(): Book[] {
        return this.books;
    }

    getBook(id: number): Book | undefined {
        return this.books.find((book) => book.id === id);
    }

    getAllSeries(): Series[] {
        return this.series;
    }

    getSeries(id: number): Series | undefined {
        return this.series.find((series) => series.id === id);
    }

    getBooksByAuthor(authorId: number): Book[] {
        return this.books.filter((book) => book.authorId === authorId);
    }

    getBooksBySeries(seriesId: number): Book[] {
        return this.books.filter((book) => book.seriesId === seriesId);
    }

    createAuthor(author: Author): Author {
        this.authors.push(author);
        return author;
    }

    createNationality(nationality: Nationality): Nationality {
        this.nationalities.push(nationality);
        return nationality;
    }

    createBook(book: Book): Book {
        this.books.push(book);
        return book;
    }

    createSeries(series: Series): Series {
        this.series.push(series);
        return series;
    }

    updateAuthor(author: Author): Author | undefined {
        const index = this.authors.findIndex((a) => a.id === author.id);
        if (index === -1) {
            return undefined;
        }
        this.authors[index] = author;
        return author;
    }

    updateNationality(nationality: Nationality): Nationality | undefined {
        const index = this.nationalities.findIndex((n) => n.id === nationality.id);
        if (index === -1) {
            return undefined;
        }
        this.nationalities[index] = nationality;
        return nationality;
    }

    updateBook(book: Book): Book | undefined {
        const index = this.books.findIndex((b) => b.id === book.id);
        if (index === -1) {
            return undefined;
        }
        this.books[index] = book;
        return book;
    }

    updateSeries(series: Series): Series | undefined {
        const index = this.series.findIndex((s) => s.id === series.id);
        if (index === -1) {
            return undefined;
        }
        this.series[index] = series;
        return series;
    }

    deleteAuthor(id: number): Author | undefined {
        const index = this.authors.findIndex((author) => author.id === id);
        if (index === -1) {
            return undefined;
        }
        const author = this.authors[index];
        this.authors.splice(index, 1);
        return author;
    }

    deleteNationality(id: number): Nationality | undefined {
        const index = this.nationalities.findIndex((nationality) => nationality.id === id);
        if (index === -1) {
            return undefined;
        }
        const nationality = this.nationalities[index];
        this.nationalities.splice(index, 1);
        return nationality;
    }

    deleteBook(id: number): Book | undefined {
        const index = this.books.findIndex((book) => book.id === id);
        if (index === -1) {
            return undefined;
        }
        const book = this.books[index];
        this.books.splice(index, 1);
        return book;
    }

    deleteSeries(id: number): Series | undefined {
        const index = this.series.findIndex((series) => series.id === id);
        if (index === -1) {
            return undefined;
        }
        const series = this.series[index];
        this.series.splice(index, 1);
        return series;
    }

    seedData() {
        const authorData = require('../../data/authors.json');
        const bookData = require('../../data/books.json');
        this.authors = authorData.authors;
        this.nationalities = authorData.nationalities;

        this.books = bookData.books;
        this.series = bookData.series;
    }

    getSeriesByAuthor(authorId: number) {
        const authorSeries = this.books
            .filter((book) => book.authorId === authorId)
            .filter((book) => book.seriesId !== undefined)
            .map((book) => book.seriesId)
            .map((seriesId) => this.series.find((series) => series.id === seriesId));
        // remove duplicates
        return Array.from(new Set(authorSeries));
    }

    getBooksByShelf(libraryId: string, floorId: string, sectionId: string, shelfId: string) {
        return []; // Not implemented
    }

    getParagraph(authorId: string, bookId: string, chapterId: string, pageId: string, paragraphId: string) {
        return {}; // Not implemented
    }
}