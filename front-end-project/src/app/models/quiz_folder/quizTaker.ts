import {StudentModel} from '../student/student.model';
import {Quiz} from './quiz';

export class QuizTaker {
  id: number;
  student_details: StudentModel;
  quiz_details: Quiz;
  constructor(
    public score: number,
    public start_time: Date,
    public end_time: Date,
    public associated_student: number,
    public associated_quiz: number
  ) {}
}
