import { Component, OnInit } from '@angular/core';
import {Answer} from '../../models/quiz_folder/answer';
import {QuizService} from '../../services/quizz/quiz.service';
import {Quiz} from '../../models/quiz_folder/quiz';
import {QuizTaker} from '../../models/quiz_folder/quizTaker';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {
  panelOpenState = false;
  mark = 0;
  result = 0.0;
  userAnswers: Answer[] = [];
  myQuiz: Quiz = new Quiz('', 1, 0, 1, 1, []);
  quizTaker: QuizTaker = null;

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    // console.log('quiz result');
    this.userAnswers = this.quizService.getUserAnswers();
    // console.log(this.userAnswers);
    this.quizService.getSelectedQuiz(this.quizService.selectedQuiz).subscribe(
      (data: Quiz) => {this.myQuiz = data; this.performScore(); }
    );
  }

  performScore() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.userAnswers.length; i++) {
      if (this.userAnswers[i]) {
        if (this.userAnswers[i].is_true) {
          this.mark = this.mark + 1;
        }
      }
    }
    this.result = ((this.mark / this.myQuiz.questions.length) * 100);
    /*console.log(this.quizTaker);
    console.log('quizTakerId is ' + this.quizService.quizTakerId);*/
    this.quizService.getSelectedQuizTaker(this.quizService.quizTakerId).subscribe(
      (data: QuizTaker) => {
        this.quizTaker = data;
        // console.log(this.quizTaker);
        this.quizTaker.end_time = new Date();
        this.quizTaker.score = this.result;
        // console.log(this.quizTaker);
        this.quizService.quizTakerUpdate(this.quizTaker).subscribe(
          () => {console.log('put operation succeeded'); },
          () => {console.log('put operation failed'); }
        );
      }
    );
  }

  setColor(index: number, answer: Answer): string {
    if (this.userAnswers[index]) {
      if (this.userAnswers[index].id === answer.id) {
        if (this.userAnswers[index].is_true) {
          return 'green';
        } else {
          return 'red';
        }
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  }

}
