import {GetcourseModel} from '../course/getcourses.model';

export class ClassesModel {
  id: number;
  constructor(
    public class_number: number,
    public option: string,
    public level: string,
    public serie: string,
    public courses: number[],
    public teacher: number[],
    public my_admin: number
  ) {}
}
