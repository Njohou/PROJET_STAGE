import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../../services/student/students.service";
import {TeachersService} from "../../services/teacher/teachers.service";
import {CoursesService} from "../../services/courses/courses.service";
import {ClassService} from "../../services/classes/class.service";
import {Chart} from 'chart.js';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  NbreUser: number;
  NbreSubj = 0;
  NbreClass = 0;

  NbreTeacher = 0;
  NbreStudent: number;
  color = ['red', 'blue', 'pink', 'yellow', 'green', 'orange', 'gray', 'aqua',
            'aquamarine', 'indigo', 'lime', 'magenta', 'gold', 'cyan', 'coral',
            'FireBrick', 'LightSeaGreen', 'Navy', 'Teal', 'Tomato', 'YellowGreen',
            'Fuchsia', 'Azure', 'Moccasin', 'Olive', 'OrangeRed', 'SpringGreen'];

  constructor(private studentService: StudentsService,
              private teacherService: TeachersService,
              private courseService: CoursesService,
              private classeService: ClassService) { }

  ngOnInit() {
    this.CalculMethod();
  }
  CalculMethod() {
    const studentLength: number[] = [];
    const className: string[] = [];
    const barColor = [];
    /* Calculate the number of classes */
    this.classeService.GetAllClasses()
      .subscribe((data) => {
          this.NbreClass = data.length;
          // console.log(data);
        for (let i = 0; i < data.length; i++) {
          barColor.push(this.color[Math.floor(Math.random() * this.color.length)]);
          studentLength.push(data[i].all_students.length);
          className.push(data[i].level + ' ' + data[i].class_number + ' ' + data[i].option + ' ' + data[i].serie);
        }
          console.log(studentLength);
          console.log(className);
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
    /* End */
    /* Calculate the number of Subjects */
    this.courseService.GetAllCourses()
      .subscribe((data) => {
          this.NbreSubj = data.length;
      });
    /* End */
    /* Calculate the number of Users */
    this.teacherService.GetAllTeacher()
      .subscribe((data) => {
        this.NbreTeacher = data.length;
        this.studentService.GetAllStudent()
          .subscribe((data2) => {
            this.NbreStudent = data2.length;
            this.NbreUser = this.NbreTeacher + this.NbreStudent;
            // console.log(this.NbreStudent + ' , ' + this.NbreTeacher);
            /* Daughnut display the proportion */
            let daughnut = new Chart('Daughnut', {
              type: 'doughnut',
              data: {
                labels : ['Teacher', 'Student'],
                datasets: [{
                  data: [this.NbreTeacher, this.NbreStudent],
                  backgroundColor: ['red', 'blue']
                }]
              },
            });
          });
      });
    /* End */
    // tslint:disable-next-line:max-line-length
   // console.log('user : ' + this.NbreUser + ', class : ' + this.NbreClass + ', teacher : ' + this.NbreTeacher + ', student : ' + this.NbreStudent + ', subject : ' + this.NbreSubj);
  }

}
