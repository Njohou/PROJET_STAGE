import {Answer} from './answer';

export class Question {
  public id;
  constructor(public question_desc: string, public answers: Answer[]) {}
}
