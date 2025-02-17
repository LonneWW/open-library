import { Book } from './book';

export interface ApiResponse {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: Book[];
}
