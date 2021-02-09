import {Question} from './question';
import {TeacherModel} from '../teacher/teacher.model';
import {GetClassesModel} from '../class/getclasses.models';

export class Quiz {
  id: number;
  teacher_details: TeacherModel;
  classe_details: GetClassesModel;
  constructor(
    public entitled: string,
    public course: number,
    public req_time: number,
    public classe: number,
    public teacher: number,
    public questions: Question[]
  ) {}
}
