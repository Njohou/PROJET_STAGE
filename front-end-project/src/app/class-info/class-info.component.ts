import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {CuClassComponent} from '../crud/cu-class/cu-class.component';
import {ActivatedRoute} from '@angular/router';
import {ClassService} from '../services/classes/class.service';
import {GetClassesModel} from '../models/class/getclasses.models';

@Component({
  selector: 'app-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['./class-info.component.scss']
})
export class ClassInfoComponent implements OnInit {
  classInfo: GetClassesModel;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private classService: ClassService) {
  }

  /* First table student */
  studentColumns: string[] = ['regis_number', 'first_name', 'last_name', 'tel', 'dateOfBirth', 'gender', 'is_active', 'is_superuser', 'is_staff'];
  STUDENT_DATA: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) studentpaginator: MatPaginator;

  /* second table teacher */
  teacherColumns: string[] = ['username', 'first_name', 'last_name', 'email', 'tel', 'gender', 'is_superuser', 'is_staff', 'is_active'];
  TEACHER_DATA: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) teacherpaginator: MatPaginator;

  /* Third table course */
  courseColumns: string[] = ['entitled', 'coefficient', 'teacher'];
  COURSE_DATA: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) coursepaginator: MatPaginator;

  ngOnInit() {
    // this.STUDENT_DATA.paginator = this.studentpaginator;
    this.PopulatePage();
  }

  studentFilter(filterValue: string) {
    this.STUDENT_DATA.filter = filterValue.trim().toLowerCase();
  }

  teacherFilter(filterVal: string) {
    this.TEACHER_DATA.filter = filterVal.trim().toLowerCase();
  }

  CourseFilter(filterVal: string) {
    this.COURSE_DATA.filter = filterVal.trim().toLowerCase();
  }

  /* Display all students, teachers and courses in the class selected. */
  PopulatePage() {
    /* For teacher / For course */
    const id = this.route.snapshot.params['id'];
    this.classService.GetSingleClass(+id)
      .subscribe(
        (data) => {
          this.classInfo = data;
          this.TEACHER_DATA = new MatTableDataSource(data.teachers);
          this.TEACHER_DATA.paginator = this.teacherpaginator;
          this.COURSE_DATA = new MatTableDataSource(data.all_courses);
          this.COURSE_DATA.paginator = this.coursepaginator;
          this.STUDENT_DATA = new MatTableDataSource(data.all_students);
          this.STUDENT_DATA.paginator = this.studentpaginator;
        }, error => console.log(error));
    /* For student */
  }
}
