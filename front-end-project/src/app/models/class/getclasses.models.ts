import {GetcourseModel} from '../course/getcourses.model';
import {TeacherModel} from '../teacher/teacher.model';
import {StudentModel} from '../student/student.model';

export class GetClassesModel {
  id: number;
  all_students: StudentModel[];
  constructor(
    public class_number: number,
    public option: string,
    public level: string,
    public serie: string,
    public all_courses: GetcourseModel[],
    public teachers: TeacherModel[]
  ) {}
}
