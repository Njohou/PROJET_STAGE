import {CourseModel} from "../course/courses.model";
import {ClassesModel} from "../class/classes.model";
import {GetcourseModel} from "../course/getcourses.model";
import {GetClassesModel} from "../class/getclasses.models";

export class GetstudentModel {
  id: number;
  student_class: GetClassesModel;
  constructor(public regis_number: string,
              public first_name: string,
              public last_name: string,
              public password: string,
              public tel: number,
              public dateOfBirth: Date,
              public gender: string,
              public is_active: boolean,
              public is_staff: boolean,
              public is_superuser: boolean,
              public my_class: ClassesModel,
              public courses: GetcourseModel[]
  ) {}
}
