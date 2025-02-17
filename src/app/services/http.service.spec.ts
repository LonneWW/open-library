import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Book } from '../models/book';
import { BookDetails } from '../models/book-details';
import { environment } from '../../environments/environment';

describe('HttpService', () => {
  let service: HttpService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), HttpService],
    });
    service = TestBed.inject(HttpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch book list', () => {
    const dummyBooksList: Book[] = [
      {
        key: '/works/OL138052W',
        title: "Alice's Adventures in Wonderland",
        authors: [{ key: '/authors/OL22098A', name: 'Lewis Carroll' }],
      },
      {
        key: '/works/OL18417W',
        title: 'The Wonderful Wizard of Oz',
        authors: [{ key: '/authors/OL23431A', name: 'L. Frank Baum' }],
      },
    ];
    const subjectEndpoint = 'https://api.example.com/subjects';
    const page = 2;

    service.getBooksList(subjectEndpoint, page).subscribe((books) => {
      expect(books).toEqual(dummyBooksList);
    });

    const req = httpTesting.expectOne(
      `${subjectEndpoint}.json?offset=${page * 12}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyBooksList);
  });

  it('should fetch book details', () => {
    const dummyBookDetails: BookDetails = {
      description: {
        type: '/type/text',
        value:
          "Alice's Adventures in Wonderland (commonly Alice i… and literature, especially in the fantasy genre.",
      },
    };
    const key = '/works/OL12345W';

    service.getBookDetails(key).subscribe((book) => {
      expect(book).toEqual(dummyBookDetails);
    });

    const req = httpTesting.expectOne(`${environment.apiEndPoint}${key}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBookDetails);
  });
});
