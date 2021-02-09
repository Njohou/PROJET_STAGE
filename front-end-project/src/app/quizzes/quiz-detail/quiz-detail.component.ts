import {Component, OnDestroy, OnInit} from '@angular/core';
import {Quiz} from '../../models/quiz_folder/quiz';
import {QuizService} from '../../services/quizz/quiz.service';
import {Answer} from '../../models/quiz_folder/answer';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DialogQuizComponent} from './dialog-quiz/dialog-quiz.component';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit, OnDestroy {
  quiz: Quiz = null;
  currentIndex = 0;
  tempUserAnswer: Answer = null;
  userAnswerList: Answer[] = [];
  selectedAnswer: number;

  nextDisable = false;
  previousDisable = false;

  timeLeft = 10;
  interval;

  constructor(private quizService: QuizService, private router: Router, private route: ActivatedRoute,
              private dialog: MatDialog,
              public infoBull: MatSnackBar) { }

  ngOnInit() {
    // Get quiz id from url
    const id = + this.route.snapshot.params.id;
    this.quizService.selectedQuiz = id;

    // Get the quiz
    this.quizService.getSelectedQuiz(id)
      .subscribe(
        (data: any) => {
          this.quiz = data;
          // console.log(this.quiz);

          // first time to load the component
          // hide is the quiz time key
          if (localStorage.getItem('hide') == null) {
            this.timeLeft = this.quiz.req_time * 60;
            localStorage.setItem('hide', this.timeLeft + '');
          }

        },
        (error) => {console.log(error); }
      );
    this.quizService.selectedAnswer.subscribe(
      (answer: Answer) => {
        this.tempUserAnswer = answer;
        this.selectedAnswer = this.tempUserAnswer.id;
        // console.log(this.tempUserAnswer);
      }
    );
    // timer management
    this.startTimer();
  }

  submitQuiz() {
    /*console.log('final result: ' + this.userAnswerList);
    console.log(this.userAnswerList);*/
    // save user answers
    this.quizService.saveUserAnswers(this.userAnswerList);
    this.router.navigate(['/quiz-result']);
  }

  saveAnswer() {
      this.previousDisable = false;
      if (this.tempUserAnswer != null) {
        this.selectedAnswer = this.tempUserAnswer.id;
        this.userAnswerList.push(this.tempUserAnswer);
        this.tempUserAnswer = null;
      }
    }

  next() {
    this.saveAnswer();
    if (this.currentIndex === this.quiz.questions.length - 1) {
      this.submitQuiz();
      return;
    }
    if (this.currentIndex !== this.quiz.questions.length - 1) {
      this.currentIndex += 1;
    }
    // console.log('nextDisable', this.nextDisable);
  }

  previous() {
    if (this.currentIndex === 0) {
      this.previousDisable = true;
      // console.log('previousDisabled' + this.previousDisable);
    }
    if (this.userAnswerList.length === 0) {
      this.userAnswerList.pop();
    }

    if (this.currentIndex !== 0) {
      this.currentIndex -= 1;
    }
  }


  startTimer() {
    this.interval = setInterval(() => {
      this.timeLeft = + localStorage.getItem('hide');
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 1;
        localStorage.setItem('hide', '' + this.timeLeft);
      } else if (this.timeLeft === 0) {
        this.pauseTimer();
        // console.log('time up');
        this.TimeEnd();
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  /* When time finishes */
  TimeEnd() {
    const dialog = this.dialog.open(DialogQuizComponent, {
      width: '20%',
      height: '30%',
      disableClose: true
    });
    dialog.afterClosed()
      .subscribe(data => {
        this.infoBull.open('time went out', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/quiz/list']);
      });
  }

  ngOnDestroy(): void {
    this.pauseTimer();
    localStorage.removeItem('hide');
  }

}
