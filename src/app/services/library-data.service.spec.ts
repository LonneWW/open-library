import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { LibraryDataService } from './library-data.service';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiResponse } from '../models/api-response';
import { Book } from '../models/book';
import { BookDetails } from '../models/book-details';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('LibraryDataService', () => {
  let libraryService: LibraryDataService;
  let httpService: HttpService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
        LibraryDataService,
      ],
    });
    libraryService = TestBed.inject(LibraryDataService);
    httpService = TestBed.inject(HttpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });
  it('should be created', () => {
    expect(libraryService).toBeTruthy();
  });

  it('should fetch book list and update books and total works', () => {
    const dummyBooksList: ApiResponse = {
      key: '/subjects/fantasy',
      name: 'fantasy',
      subject_type: 'subject',
      work_count: 12630,
      works: [
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
      ],
    };
    const endpoint = 'https://api.example.com/subjects';

    libraryService.setEndpoint(endpoint);
    libraryService.getBooks(0);

    const req = httpTesting.expectOne(`${endpoint}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBooksList);

    libraryService.books$.subscribe((books) => {
      expect(books).toEqual(dummyBooksList.works);
    });

    libraryService.totalWorks$.subscribe((totalWorks) => {
      expect(totalWorks).toEqual(dummyBooksList.work_count);
    });
  });

  it('should fetch book details and update bookDetails', () => {
    const dummyBookDetails: BookDetails = {
      description: {
        type: '/type/text',
        value:
          "Alice's Adventures in Wonderland (commonly Alice i… and literature, especially in the fantasy genre.",
      },
    };
    const key = '/works/OL12345W';

    libraryService.getBookDescription(key);

    const req = httpTesting.expectOne(`${environment.apiEndPoint}${key}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBookDetails);

    libraryService.bookDetails$.subscribe((bookDetails) => {
      expect(bookDetails).toEqual(dummyBookDetails);
    });
  });

  it('should handle errors when fetching book list', () => {
    const endpoint = 'https://api.example.com/subjects';
    libraryService.setEndpoint(endpoint);
    libraryService.getBooks(0);

    const req = httpTesting.expectOne(`${endpoint}.json`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    libraryService.queryLoading$.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
    });
  });

  it('should handle errors when fetching book details', () => {
    const key = '/works/OL12345W';
    libraryService.getBookDescription(key);

    const req = httpTesting.expectOne(`${environment.apiEndPoint}${key}.json`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    libraryService.bookDetails$.subscribe((bookDetails) => {
      expect(bookDetails).toEqual({});
    });
  });
});
