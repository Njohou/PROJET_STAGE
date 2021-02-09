import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {TeachersService} from '../../services/teacher/teachers.service';
import {CoursesService} from '../../services/courses/courses.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CuCoursePopupComponent} from './cu-course-popup/cu-course-popup.component';
import {GetcourseModel} from "../../models/course/getcourses.model";
import {Subject, Subscription} from "rxjs";
import {GetstudentModel} from "../../models/student/getstudent.model";


@Component({
  selector: 'app-course-crud',
  templateUrl: './course-crud.component.html',
  styleUrls: ['./course-crud.component.scss']
})
export class CourseCrudComponent implements OnInit {

  COURSE_DATA: MatTableDataSource<any>;
  courseArray: GetcourseModel[] = [];
  courseSubscription: Subscription;

  /* Table variables */
  displayedColumns: string[] = ['entitled', 'coefficient', 'teacher', 'actions'];

  @ViewChild(MatPaginator, {static: true}) Coursepaginator: MatPaginator;
  /* End */

  constructor(private formBuilder: FormBuilder,
              private teacherService: TeachersService,
              private courseService: CoursesService,
              private dialog: MatDialog,
              public infoBull: MatSnackBar) { }

  ngOnInit() {
    // this.getCourses();
    this.GetAllCourse();
  }

  /* Table information and functions */
  applyFilter(filterValue: string) {
    this.COURSE_DATA.filter = filterValue.trim().toLowerCase();
  }

  /* Get all courses in Data base */
  GetAllCourse() {
     this.courseSubscription = this.courseService.courseSubject
       .subscribe((data ) => {
         this.COURSE_DATA = new MatTableDataSource(data);
         this.COURSE_DATA.paginator = this.Coursepaginator;
         // console.log(data);
        }, error => console.log(error));
     this.courseService.GetAllCoursesArray();
     // this.courseService.EmitCourse();
  }

  /* Delete a course */
  DeleteCourse(idcourse) {
    // console.log(idcourse);
    if (confirm('Are you sure to delete this course ?') === true) {
      this.courseService.DeleteCourse(idcourse)
        .subscribe(result => {
          this.courseArray = [];
          this.GetAllCourse();
          // console.log(result);
        }, error => console.log(error));
    }
  }

  OpenCreateMethod() {
    const dialog = this.dialog.open(CuCoursePopupComponent, {
      width : '30%',
      height : '65%',
      disableClose : true
    });
  }

  OpenUpdateMethod(CourseData) {
    const dialog = this.dialog.open(CuCoursePopupComponent, {
      width : '30%',
      height : '65%',
      disableClose : true,
      data : CourseData
    });
  }
}
