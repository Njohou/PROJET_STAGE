import {Component, OnInit, ViewChild} from '@angular/core';
import {ClassService} from '../services/classes/class.service';
import {CoursesService} from '../services/courses/courses.service';
import {GetcourseModel} from '../models/course/getcourses.model';
import {GetClassesModel} from '../models/class/getclasses.models';
import {EvaluationModel} from '../models/evaluation/evaluation.model';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {Chart} from 'chart.js';
import {QuizService} from '../services/quizz/quiz.service';
import {QuizTaker} from "../models/quiz_folder/quizTaker";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isStaff: string;
  isSuperuser: string;
  isActive: string;
  id: string;
  NbreCourse = 0;
  NbreClass = 0;
  NbreQuiz = 0;
  ClassArray: GetClassesModel[] = [];
  color = ['red', 'blue', 'pink', 'yellow', 'green', 'orange', 'gray', 'aqua',
            'aquamarine', 'indigo', 'lime', 'magenta', 'gold', 'cyan', 'coral',
            'FireBrick', 'LightSeaGreen', 'Navy', 'Teal', 'Tomato', 'YellowGreen',
            'Fuchsia', 'Azure', 'Moccasin', 'Olive', 'OrangeRed', 'SpringGreen'];

  displayedColumns: string[] = ['entitled', 'classes'];
  COURSES_DATA: MatTableDataSource<GetcourseModel>;
  courseArray: GetcourseModel[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private classeService: ClassService,
              private courseService: CoursesService,
              private quizService: QuizService) { }

  ngOnInit() {
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');
    this.id = localStorage.getItem('id');
    this.isActive = localStorage.getItem('is_active');
    this.GetAllCourse();
    this.GetAllClasses();
    this.GetAllQuiz();
    this.GetAllQuizTaker();
  }

  /* Table informations and functions */
  applyFilter(filterValue: string) {
    this.COURSES_DATA.filter = filterValue.trim().toLowerCase();
  }
  /* End */

  GetAllCourse() {
    this.courseService.GetAllCourses()
      .subscribe((data) => {
        // console.log(data);
        if (this.isStaff === 'true' && this.isSuperuser === 'false') {
          for (let i = 0; i < data.length; i++) {
            if (this.id === data[i].course_teacher.id.toString()) {
              this.courseArray.push(data[i]);
              this.NbreCourse++;
              this.NbreClass = data[i].classes.length;
            }
          }
          this.COURSES_DATA = new MatTableDataSource(this.courseArray);
          this.COURSES_DATA.paginator = this.paginator;
          // console.log(this.COURSES_DATA);
        }
      });
  }

  GetAllQuiz() {
    this.quizService.getQuiz()
      .subscribe((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (this.id === data[i].teacher_details.id.toString()) {
            this.NbreQuiz++;
          }
        }
        // console.log(this.NbreQuiz);
      });
  }

  GetAllClasses() {
    const studentLength: number[] = [];
    const className: string[] = [];
    const barColor = [];
    this.classeService.GetAllClasses()
      .subscribe((data) => {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].teachers.length; j++) {
            if (this.id === data[i].teachers[j].id.toString()) {
              barColor.push(this.color[Math.floor(Math.random() * this.color.length)]);
              this.ClassArray.push(data[i]);
              studentLength.push(data[i].all_students.length);
              className.push(data[i].level + ' ' + data[i].class_number + ' ' + data[i].option + ' ' + data[i].serie);
            }
          }
        }
        // console.log(this.ClassArray);
        // console.log(studentLength);
        // console.log(className);
        const barChart = new Chart('bar', {
          type: 'bar',
          data: {
            labels: className,
            datasets: [{
              label: 'Number of student per class',
              data: studentLength,
              backgroundColor: barColor,
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            title: {
              text: 'Number of student per class',
              display: true
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
  }

  /* Get Quiztaker by teacher */
  QuizTakerColumns: string[] = ['name', 'surname', 'entitled', 'start_time', 'end_time', 'score'];
  QUIZTAKER_DATA: MatTableDataSource<QuizTaker>;
  quizTaker: QuizTaker[] = [];
  @ViewChild(MatPaginator, {static: true}) QuizTakerpaginator: MatPaginator;

  /* Table informations and functions */
  quizTakerFilter(filterValue: string) {
    this.QUIZTAKER_DATA.filter = filterValue.trim().toLowerCase();
  }
  /* End */

  GetAllQuizTaker() {
    this.quizService.GetAllQuizTaker()
      .subscribe((data) => {
        this.quizTaker = data.filter(taker => taker.quiz_details.teacher.toString() === this.id);
        this.QUIZTAKER_DATA = new MatTableDataSource(this.quizTaker);
        this.QUIZTAKER_DATA.paginator = this.QuizTakerpaginator;
        // console.log(this.quizTaker);
      });
  }
}
