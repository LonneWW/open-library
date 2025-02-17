import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-description',
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './book-description.component.html',
  styleUrl: './book-description.component.scss',
})
export class BookDescriptionComponent {
  @Input() bookDetails: string = '';
  @Input() showDialog: boolean = false;
  @Output() closingDialog = new EventEmitter();

  onCloseDialog() {
    this.closingDialog.emit();
  }
}
