import {CourseModel} from '../course/courses.model';
import {StudentModel} from '../student/student.model';

export class EvaluationModel {
  id: number;
  course_note: CourseModel;
  student_note: StudentModel;
  constructor(
    public eval_date: string,
    public note: number,
    public sequence: string,
    public student: number,
    public course: number
  ) {}
}
