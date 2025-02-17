import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book';
import { ApiResponse } from '../models/api-response';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LibraryDataService {
  //subjects and streams for components to subscribe and retrive data
  //books, fetched from api
  private books = new BehaviorSubject<Book[]>([]);
  public books$ = this.books.asObservable();
  //book details, fetchedfrom api
  private bookDetails = new BehaviorSubject<object>({});
  public bookDetails$ = this.bookDetails.asObservable();
  //total number of books of the current subject, fetchedfrom api
  private totalWorks = new BehaviorSubject<number>(0);
  public totalWorks$ = this.totalWorks.asObservable();
  //switch to start/stop loading elements (mat spinner and mat progress bar)
  private queryLoading = new BehaviorSubject<boolean>(false);
  public queryLoading$ = this.queryLoading.asObservable();

  //enpoint of the call, setted by components with this service method "setEndpoint".
  //used to simplify calls with same api but different offset
  private endpoint: string = '';

  //toggle to reset the page of the paginator when the query changes
  public resetPage: boolean = false;

  private _snackBar = inject(MatSnackBar);
  constructor(private http: HttpService, private router: Router) {}

  /**
   * The function `getBooks` retrieves a list of books from an API endpoint, updates the book list in
   * the application, and handles loading and error states.
   * @param {number} [page=0] - The `getBooks` function is used to fetch a list of books from an API
   * endpoint. The `page` parameter is used to specify the page number of results to retrieve. By
   * default, if no page number is provided, it will default to page 0.
   * @returns The `getBooks` function is making an HTTP request to fetch a list of books from the
   * provided endpoint. If successful, it updates the list of books, total work count, and navigates to
   * the 'books' route. If there is an error, it displays a snackbar message and logs the error to the
   * console.
   */
  getBooks(page: number = 0) {
    if (!this.endpoint) {
      console.log('Error');
      return;
    }

    this.queryLoading.next(true);
    this.updateBooks([]);
    this.http.getBooksList(this.endpoint, page).subscribe({
      next: (r) => {
        let response = r as ApiResponse;
        let books = response.works as Book[];
        this.updateBooks(books);
        this.updateTotalWorks(response.work_count);
        this.queryLoading.next(false);
        let searchBar = document.querySelector('#search-bar-container');
        if (searchBar && searchBar.classList.contains('bar-center')) {
          searchBar.classList.remove('bar-center');
          searchBar.classList.add('bar-on-top');
        }
        setTimeout(() => {
          this.router.navigate(['books']);
        }, 800);
        console.log(books);
        console.log(response);
      },
      error: (e) => {
        this.queryLoading.next(false);
        this._snackBar.open(
          "Couldn't get any books, check the console for more details",
          'Ok'
        );
        console.log(e);
      },
    });
  }

  /**
   * The function `getBookDescription` retrieves book details using an HTTP request and handles errors
   * accordingly.
   * @param {string} key - The `key` parameter in the `getBookDescription` function is a string that
   * represents the unique identifier or key of a book. This key is used to retrieve the book details
   * from an HTTP service by making a GET request to fetch the book's description.
   */
  getBookDescription(key: string) {
    this.http.getBookDetails(key).subscribe({
      next: (r) => {
        this.bookDetails.next(r);
        console.log(r);
      },
      error: (e) => {
        this._snackBar.open(
          "Couldn't the book's description, check the console for more details",
          'Ok'
        );
        console.log(e);
      },
    });
  }

  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  updateBooks(array: Book[]) {
    this.books.next(array);
  }

  updateTotalWorks(n: number) {
    this.totalWorks.next(n);
  }
}
