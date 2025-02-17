import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LibraryDataService } from '../../services/library-data.service';
import { Router } from '@angular/router';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    AsyncPipe,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  protected searchField = new FormControl('');
  private lastSubjectSearched: string = '';
  protected animationToggle: boolean = false;
  protected showQueryBar: boolean = false;
  protected subjects: string[] = [
    'Architecture',
    'Art Instruction',
    'Art History',
    'Dance',
    'Design',
    'Fashion',
    'Film',
    'Graphic Design',
    'Music',
    'Music Theory',
    'Painting',
    'Photography',
    'Bears',
    'Cats',
    'Kittens',
    'Dogs',
    'Puppies',
    'Fiction',
    'Fantasy',
    'Historical Fiction',
    'Horror',
    'Humor',
    'Literature',
    'Magic',
    'Mystery and detective stories',
    'Plays',
    'Poetry',
    'Romance',
    'Science Fiction',
    'Short Stories',
    'Thriller',
    'Young Adult',
    'Science &amp; Mathematics',
    'Biology',
    'Chemistry',
    'Mathematics',
    'Physics',
    'Programming',
    'Business &amp; Finance',
    'Management',
    'Entrepreneurship',
    'Business Economics',
    'Business Success',
    'Finance',
    "Children's",
    'Kids Books',
    'Stories in Rhyme',
    'Baby Books',
    'Bedtime Books',
    'Picture Books',
    'History',
    'Ancient Civilization',
    'Archaeology',
    'Anthropology',
    'World War II',
    'Social Life and Customs',
    'Cooking',
    'Cookbooks',
    'Mental Health',
    'Exercise',
    'Nutrition',
    'Self-help',
    'Biography',
    'Autobiographies',
    'Politics and Government',
    'Women',
    'Kings and Rulers',
    'Composers',
    'Artists',
    'Religion',
    'Political Science',
    'Psychology',
    'Brazil',
    'India',
    'Indonesia',
    'United States',
    'Textbooks',
    'Geography',
    'Algebra',
    'Education',
    'Business &amp; Economics',
    'Science',
    'English Language',
    'Computer Science',
  ];
  protected subjectsEndpoints: string[] = [
    'https://openlibrary.org/subjects/architecture',
    'https://openlibrary.org/subjects/art__art_instruction',
    'https://openlibrary.org/subjects/history_of_art__art__design_styles',
    'https://openlibrary.org/subjects/dance',
    'https://openlibrary.org/subjects/design',
    'https://openlibrary.org/subjects/fashion',
    'https://openlibrary.org/subjects/film',
    'https://openlibrary.org/subjects/graphic_design',
    'https://openlibrary.org/subjects/music',
    'https://openlibrary.org/subjects/music_theory',
    'https://openlibrary.org/subjects/painting__paintings',
    'https://openlibrary.org/subjects/photography',
    'https://openlibrary.org/subjects/bears',
    'https://openlibrary.org/subjects/cats',
    'https://openlibrary.org/subjects/kittens',
    'https://openlibrary.org/subjects/dogs',
    'https://openlibrary.org/subjects/puppies',
    'https://openlibrary.org/subjects/fiction',
    'https://openlibrary.org/subjects/fantasy',
    'https://openlibrary.org/subjects/historical_fiction',
    'https://openlibrary.org/subjects/horror',
    'https://openlibrary.org/subjects/humor',
    'https://openlibrary.org/subjects/literature',
    'https://openlibrary.org/subjects/magic',
    'https://openlibrary.org/subjects/mystery_and_detective_stories',
    'https://openlibrary.org/subjects/plays',
    'https://openlibrary.org/subjects/poetry',
    'https://openlibrary.org/subjects/romance',
    'https://openlibrary.org/subjects/science_fiction',
    'https://openlibrary.org/subjects/short_stories',
    'https://openlibrary.org/subjects/thriller',
    'https://openlibrary.org/subjects/young_adult_fiction',
    'https://openlibrary.org/subjects/sciencemathematics',
    'https://openlibrary.org/subjects/biology',
    'https://openlibrary.org/subjects/chemistry',
    'https://openlibrary.org/subjects/mathematics',
    'https://openlibrary.org/subjects/physics',
    'https://openlibrary.org/subjects/programming',
    'https://openlibrary.org/subjects/business',
    'https://openlibrary.org/subjects/management',
    'https://openlibrary.org/subjects/entrepreneurship',
    'https://openlibrary.org/subjects/business__economics',
    'https://openlibrary.org/subjects/success_in_business',
    'https://openlibrary.org/subjects/finance',
    'https://openlibrary.org/subjects/juvenile_fiction',
    'https://openlibrary.org/subjects/juvenile_literature',
    'https://openlibrary.org/subjects/stories_in_rhyme',
    'https://openlibrary.org/subjects/infancy',
    'https://openlibrary.org/subjects/bedtime',
    'https://openlibrary.org/subjects/picture_books',
    'https://openlibrary.org/subjects/history',
    'https://openlibrary.org/subjects/ancient_civilization',
    'https://openlibrary.org/subjects/archaeology',
    'https://openlibrary.org/subjects/anthropology',
    'https://openlibrary.org/search?q=subject%3AHistory&subject_facet=History&subject_facet=World+War%2C+1939-1945',
    'https://openlibrary.org/search?q=subject%3AHistory&subject_facet=History&subject_facet=Social+life+and+customs',
    'https://openlibrary.org/subjects/cooking',
    'https://openlibrary.org/subjects/cookbooks',
    'https://openlibrary.org/subjects/mental_health',
    'https://openlibrary.org/subjects/exercise',
    'https://openlibrary.org/subjects/nutrition',
    'https://openlibrary.org/subjects/self-help',
    'https://openlibrary.org/subjects/biography',
    'https://openlibrary.org/subjects/autobiography',
    'https://openlibrary.org/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=Politics+and+government',
    'https://openlibrary.org/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=Women',
    'https://openlibrary.org/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=Kings+and+rulers',
    'https://openlibrary.org/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=Composers',
    'https://openlibrary.org/search?q=subject%3ABiography&subject_facet=Biography&subject_facet=Artists',
    'https://openlibrary.org/subjects/religion',
    'https://openlibrary.org/subjects/political_science',
    'https://openlibrary.org/subjects/psychology',
    'https://openlibrary.org/subjects/place%3Abrazil',
    'https://openlibrary.org/subjects/place%3Aindia',
    'https://openlibrary.org/subjects/place%3Aindonesia',
    'https://openlibrary.org/subjects/place%3Aunited_states',
    'https://openlibrary.org/subjects/textbooks',
    'https://openlibrary.org/search?q=subject%3ATextbooks&subject_facet=Textbooks&subject_facet=Geography',
    'https://openlibrary.org/search?q=subject%3ATextbooks&subject_facet=Textbooks&subject_facet=Algebra',
    'https://openlibrary.org/search?q=subject%3ATextbooks&subject_facet=Textbooks&subject_facet=Education',
    'https://openlibrary.org/search?q=subject%3ATextbook+subject%3ABusiness&subject_facet=Textbooks',
    'https://openlibrary.org/search?q=subject%3ATextbooks&subject_facet=Textbooks&subject_facet=Science',
    'https://openlibrary.org/search?q=subject%3ATextbooks&subject_facet=Textbooks&subject_facet=English+language',
    'https://openlibrary.org/search?q=subject%3A%22Computer+science%22&sort=editions&subject_facet=Computer+science',
  ];
  protected filteredOptions!: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.subjects.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  constructor(
    private libraryService: LibraryDataService,
    private router: Router
  ) {}
  getBooksList() {
    if (
      this.searchField.value &&
      this.lastSubjectSearched != this.searchField.value
    ) {
      this.showQueryBar = true;
      this.lastSubjectSearched = this.searchField.value;
      let subject: string = this.searchField.value;
      let subjectIndexInEndpoints = this.subjects.indexOf(subject);
      let endpoint = this.subjectsEndpoints[subjectIndexInEndpoints];
      this.libraryService.setEndpoint(endpoint);
      this.libraryService.resetPage = true;
      this.libraryService.getBooks();
    }
  }

  ngOnInit(): void {
    this.filteredOptions = this.searchField.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.router.events.subscribe(() => {
      const url = this.router.url;
      if (url.includes('books')) {
        this.animationToggle = true;
      } else {
        this.animationToggle = false;
      }
    });

    this.libraryService.queryLoading$.subscribe((r) => {
      this.showQueryBar = r;
    });

    if (document.location.pathname.includes('books')) {
      this.router.navigate(['']);
    }
  }
}
