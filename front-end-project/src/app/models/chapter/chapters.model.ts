import {GetcourseModel} from '../course/getcourses.model';

export class ChapterModel {
    id: number;
    courseObj: GetcourseModel;
    constructor(
      public entitled: string,
      public text: string,
      public course: number
    ) {}
}
