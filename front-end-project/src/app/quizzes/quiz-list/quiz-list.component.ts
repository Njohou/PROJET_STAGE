import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../services/quizz/quiz.service';
import {Router} from '@angular/router';
import {StudentsService} from '../../services/student/students.service';
import {QuizTaker} from '../../models/quiz_folder/quizTaker';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  public quiz: any[] = [];
  isStaff: string;
  isSuperuser: string;
  id: string;

  constructor(private quizService: QuizService,
              private router: Router,
              private snackBar: MatSnackBar,
              private studentService: StudentsService) { }

  ngOnInit() {
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');
    this.id = localStorage.getItem('id');
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.getQuiz()
      .subscribe(
        (data) => {
         // console.log(data);

          // if you are a superuser
          if (this.isSuperuser === 'true') {
            this.quiz = data;

            // if you are a teacher
          } else if (this.isStaff === 'true') {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.length; i++) {
              if (this.id === data[i].teacher_details.id.toString()) {
                // console.log(data[i]);
                this.quiz.push(data[i]);
              }
            }

            // if you are a student
          } else {
            // console.log('student');
            let studentClassId = -1;
            this.studentService.GetSpecificStudent(+ this.id).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              (user) => {
                studentClassId = user.student_class.id;
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                  if (studentClassId === data[i].classe_details.id) {
                    // console.log(data[i]);
                    this.quiz.push(data[i]);
                    // console.log(this.quiz);
                  }
                }
                },
              error => {console.log(error); }
            );
          }
        },
        (error ) => {
          console.log(error);
        });
  }

  participate(quizId: number) {
    // tslint:disable-next-line:radix
    const studentId = parseInt(localStorage.getItem('id'));
    this.setQuizTaker(0, studentId, quizId);
  }

  setQuizTaker(score: number, studentId: number, quizId: number) {
    const quizTaker = new QuizTaker(score, new Date(), new Date(), studentId, quizId);
    this.quizService.quizTaker(quizTaker).subscribe(
      (data) => {
        // console.log(data);
        // take quizTakerId value
        this.quizService.quizTakerId = data.id;
        this.router.navigate(['/quiz/participate', quizId]); },
      (error) => { console.log(error); }
    );
  }

  DeleteMethod(id) {
    // console.log(id);
    if (confirm('Are you sure to delete this quiz ?') === true) {
      this.quizService.DeleteQuiz(id)
        .subscribe((data) => {
          if (data === 'This quiz has been deleted.') {
            this.quiz = [];
            this.loadQuiz();
            this.snackBar.open(data.toString(), 'Close', {
              duration: 3000
            });
          }
        });
    }
  }

}
