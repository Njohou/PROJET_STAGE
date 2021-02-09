import {TeacherModel} from '../teacher/teacher.model';

export class CourseModel {
  id: number;
  constructor(
    public entitled: string,
    public coefficient: number,
    public teacher: number,
    public my_admin: number
  ) {}
}
