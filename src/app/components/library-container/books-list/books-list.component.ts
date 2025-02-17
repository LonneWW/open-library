import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';
import { Book } from '../../../models/book';
import { Author } from '../../../models/author';
import { LibraryDataService } from '../../../services/library-data.service';
@Component({
  selector: 'app-books-list',
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent implements OnInit {
  protected books: Book[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  @Output() descriptionButtonClicked: EventEmitter<any> = new EventEmitter();
  constructor(private libraryService: LibraryDataService) {}

  ngOnInit(): void {
    //this subscription update the books based on the calls to the api made by the library service
    this.libraryService.books$.pipe(takeUntil(this.destroy$)).subscribe((r) => {
      this.books = r as Book[];
    });
  }

  buildAuthorsString(array: Author[]) {
    return array.map((author) => author.name).join(', ');
  }

  //this method emit an event when the the button to show description is clicked.
  //this way, the library-container component listen to this event and show the book description
  onDescriptionButtonClick(key: string) {
    this.descriptionButtonClicked.emit(key);
  }
}
