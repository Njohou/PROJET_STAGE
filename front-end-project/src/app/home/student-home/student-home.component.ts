import {Component, OnInit, ViewChild} from '@angular/core';
import {EvaluationModel} from '../../models/evaluation/evaluation.model';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {EvaluationService} from '../../services/evaluation/evaluation.service';
import {GetstudentModel} from '../../models/student/getstudent.model';
import {StudentsService} from '../../services/student/students.service';
import { Chart } from 'chart.js';
import {QuizService} from "../../services/quizz/quiz.service";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  isStaff: string;
  isSuperuser: string;
  isActive: string;
  id: string;
  color = ['red', 'blue', 'pink', 'yellow', 'green', 'orange', 'gray', 'aqua',
          'aquamarine', 'indigo', 'lime', 'magenta', 'gold', 'cyan', 'coral',
          'FireBrick', 'LightSeaGreen', 'Navy', 'Teal', 'Tomato', 'YellowGreen',
          'Fuchsia', 'Azure', 'Moccasin', 'Olive', 'OrangeRed', 'SpringGreen'];
  NbreCourse = 0;
  NbreStudent = 0;
  NbreQuiz = 0;

  displayedColumns: string[] = ['name', 'sequence', 'date_eval', 'courseChoose', 'note'];
  EVALUATION_DATA: MatTableDataSource<EvaluationModel>;
  EvaluationsArray: EvaluationModel[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private evaluationService: EvaluationService,
              private studentService: StudentsService,
              private quizService: QuizService) { }

  ngOnInit() {
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');
    this.id = localStorage.getItem('id');
    this.isActive = localStorage.getItem('is_active');
    this.GetAllEvaluation();
    this.GetAllStudent();
    this.BarChartFunction();
  }

  /* Table informations and functions */
  applyFilter(filterValue: string) {
    this.EVALUATION_DATA.filter = filterValue.trim().toLowerCase();
  }
  /* End */

  GetAllEvaluation() {
    this.evaluationService.GetAllEvaluation()
      .subscribe((data) => {
        console.log(data);
        if (this.isActive === 'true') {
          for (let i = 0; i < data.length; i++) {
            if (this.id === data[i].student_note.id.toString()) {
              this.EvaluationsArray.push(data[i]);
            }
          }
          this.EVALUATION_DATA = new MatTableDataSource(this.EvaluationsArray);
          this.EVALUATION_DATA.paginator = this.paginator;
        }
      }, error => console.log(error));
    // console.log(this.EvaluationsArray);
  }

  GetAllStudent() {
    let studentClassId: number;
    this.studentService.GetAllStudent()
      .subscribe((data) => {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          if (this.id === data[i].id.toString()) {
            this.NbreStudent = data[i].student_class.all_students.length;
            this.NbreCourse = data[i].student_class.all_courses.length;
          }
        }
      }, error => console.log(error));
    /* number of quiz */
    this.quizService.getQuiz()
      .subscribe((data) => {
        this.studentService.GetSpecificStudent(+ this.id).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          (user) => {
            studentClassId = user.student_class.id;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.length; i++) {
              if (studentClassId === data[i].classe_details.id) {
                // console.log(data[i]);
                this.NbreQuiz++;
              }
            }
            // console.log(this.NbreQuiz);
          },
          error => {console.log(error); }
        );
      }, error => console.log(error));
  }

  /* For barChart */

  BarChartFunction() {
    let TitleCourse = [];
    const array = [];
    const Average = [];
    const barColor = [];
    this.evaluationService.GetAllEvaluation()
      .subscribe((data) => {
        /* Take the course entitle without repetition */
        for (let i = 0; i < data.length; i++) {
          if (this.id === data[i].student_note.id.toString()) {
            array.push(data[i].course_note.entitled);
            TitleCourse = Array.from(new Set(array));
          }
        }
        /* End */
        /* Take a mark and calculated the average per course  */
        for (let j = 0; j < TitleCourse.length; j++) {
          let nbre = 0;
          let inter = 0;
          /* Take n-color in the color array */
          barColor.push(this.color[Math.floor(Math.random() * this.color.length)]);
          /* End */
          for (let n = 0; n < this.EvaluationsArray.length; n++) {
            if (TitleCourse[j] === this.EvaluationsArray[n].course_note.entitled) {
              nbre += Number(this.EvaluationsArray[n].note);
              inter++;
            }
          }
          Average.push((nbre / inter));
          const barChart = new Chart('bar', {
            type: 'bar',
            data: {
              labels: TitleCourse,
              datasets: [{
                label: 'Average',
                data: Average,
                backgroundColor: barColor,
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              title: {
                text: 'List of average mark per course',
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
        }
        /* End */
      }, error => console.log(error));
  }
  /* End */
}
