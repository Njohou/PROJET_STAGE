import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassService} from '../../services/classes/class.service';
import {ClassesModel} from '../../models/class/classes.model';
import {Subject} from 'rxjs';
import {QuizService} from '../../services/quizz/quiz.service';
import {Quiz} from '../../models/quiz_folder/quiz';
import {GetClassesModel} from '../../models/class/getclasses.models';
import {MatSnackBar} from "@angular/material";
import {NotificationService} from '../../services/notifications/notification.service';
import {NotificationPostModel} from '../../models/notification/notificationPost.model';


@Component({
  selector: 'app-build-quiz',
  templateUrl: './build-quiz.component.html',
  styleUrls: ['./build-quiz.component.scss']
})
export class BuildQuizComponent implements OnInit {

  constructor(private classService: ClassService,
              private quizService: QuizService,
              private notificationService: NotificationService,
              private infoBull: MatSnackBar) { }
  quizForm: FormGroup;
  success: boolean;
  id: string;
  isStaff: string;
  isSuperuser: string;

  myQuiz: Quiz;
  classes: GetClassesModel[] =  [];

  // keep value of the selected class
  selectedClass: number;
  selectedClassSubject = new Subject<number>();

  public isNull(item: any) {
    return item == null ? '' : item;
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');
    this.selectedClass = 0;
    this.createForm();
    this.success = false;
    // Normally we should filter classes per teacher
    this.classService.GetAllClasses()
      .subscribe(
        (data) => {
          if (this.isSuperuser === 'true') {
            this.classes = data;
            // console.log(this.classes);
          } else if (this.isStaff === 'true') {
            for (var i = 0; i < data.length; i++) {
              let tour = 0;
              for (var j = 0; j < data[i].all_courses.length; j++) {
                if (this.id === data[i].all_courses[j].course_teacher.id.toString() && tour === 0) {
                  this.classes.push(data[i]);
                  tour++;
                }
              }
            }
            // console.log(data);
          }
          },
        (error) => {console.log(error); }
      );
  }

  emit() {
    this.selectedClassSubject.next(this.selectedClass);
  }

  selectedClassF(index: number) {
    this.selectedClass = index;
    this.emit();
  }


  public createForm() {
    this.quizForm = new FormGroup({
      quizClass: new FormControl('', Validators.required),
      quizCourse: new FormControl('', Validators.required),
      quizName: new FormControl('', Validators.required),
      quizTime: new FormControl('', [Validators.required, Validators.min(0), Validators.max(300)]),
      questions: new FormArray([
        this.initQuestion(),
      ]),
    });

  }

  initQuestion() {
    return new FormGroup({
      question_desc: new FormControl('', Validators.required),
      answers: new FormArray([
        this.initAnswer(),
      ]),
    });
  }

  initAnswer() {
    return new FormGroup({
      answer: new FormControl('', Validators.required),
      is_true: new FormControl('false', Validators.required),
    });
  }

  addQuestion() {
    const control = this.quizForm.get('questions') as FormArray;
    control.push(this.initQuestion());
    // remove success div
    this.success = false;
  }

  addAnswer(j) {
    // console.log(j);
    // @ts-ignore
    const control = this.quizForm.get('questions').controls[j].get('answers') as FormArray;
    // console.log(control);
    control.push(this.initAnswer());
    // remove success div
    this.success = false;
  }

  getQuestions(form) {
    // console.log(form.get('sections').controls);
    return form.controls.questions.controls;
  }
  getAnswers(form) {
    // console.log(form.controls.questions.controls);
    return form.controls.answers.controls;
  }

  removeQuestion(i) {
    const control = this.quizForm.get('questions') as FormArray;
    control.removeAt(i);

  }

  removeAnswer(j, i) {
    // @ts-ignore
    const control = this.quizForm.get('questions').controls[j].get('answers') as FormArray;
    control.removeAt(i);
  }

  addQuiz(quiz) {
    if (! quiz.invalid) {
      this.success = true;
      this.myQuiz = new Quiz(quiz.value.quizName, quiz.value.quizCourse,
        quiz.value.quizTime, quiz.value.quizClass, +this.id, quiz.value.questions);
      // console.log(this.myQuiz);
      this.quizService.postQuiz(this.myQuiz)
        .subscribe(
          (data) => {
            // console.log(data);

            // create a notification
            const notification = new NotificationPostModel(
              this.myQuiz.entitled + ' quiz has been added has been added by ' + this.myQuiz.teacher_details.first_name,
              false,
              +this.id,
              this.myQuiz.classe
            );

            this.notificationService.postNotification(notification).subscribe(
              (data2) => { console.log(data2); },
              (error) => {console.log(error); }
            );
            this.infoBull.open('Quiz "' + data.entitled + '" has been saved !', 'Close', {
              duration: 2500
            });
            },
          (error2) => {console.log(error2); }
        );
      // console.log(this.allQuestions);
      // console.log('select : ' + this.selectedClass);
      // console.log(quiz);
    } else {
      this.success = false;
      // console.log('invalid');
    }
  }
}
