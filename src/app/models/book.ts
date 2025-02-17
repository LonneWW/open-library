import { Author } from './author';
export interface Book {
  key: string;
  title: string;
  authors: Author[];
}
