import {TeacherModel} from '../teacher/teacher.model';
import {ChapterModel} from '../chapter/chapters.model';
import {ClassesModel} from "../class/classes.model";

export class GetcourseModel {
  id: number;
  chapter_list: ChapterModel[];
  classes: ClassesModel[];
  constructor(
    public entitled: string,
    public coefficient: number,
    public course_teacher: TeacherModel,
  ) {}
}
