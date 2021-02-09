import {Component, Input, OnInit} from '@angular/core';
import {Answer} from '../../../../models/quiz_folder/answer';
import {QuizService} from '../../../../services/quizz/quiz.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  @Input()
  answer: Answer;

  @Input()
  selectedAnswer: number;

  isSelect = false;

  letter: string;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.letter = String.fromCharCode(65 + this.answer.id);
  }

  isSelected() {
    // return this.selectedAnswer === this.answer.id;
    if (this.isSelect) {
      this.isSelect = false;
    } else {
      this.isSelect = true;
    }
  }

  choose() {
    this.isSelected();
    this.quizService.selectedAnswer.emit(this.answer);
  }

}
