import { Component, OnInit } from '@angular/core';
import {Quiz} from '../models/quiz_folder/quiz';
import {QuizService} from '../services/quizz/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService} from '../services/student/students.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {
  public quiz = null;
  id: number;

  constructor(private quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.quizService.getSelectedQuiz(this.id)
      .subscribe(
        (data) => {
          console.log(data);
          this.quiz = data;
        },
        (error ) => {
          console.log(error);
        });
  }

}
