import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CuTeacherComponent} from '../cu-teacher/cu-teacher.component';
import {TeachersService} from '../../../services/teacher/teachers.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subject, Subscription} from "rxjs";
import {TeacherModel} from "../../../models/teacher/teacher.model";
import {OtherServiceService} from "../../../services/other/other-service.service";


@Component({
  selector: 'app-crud-teacher',
  templateUrl: './crud-teacher.component.html',
  styleUrls: ['./crud-teacher.component.scss']
})
export class CrudTeacherComponent implements OnInit {

  TEACHER_DATA: MatTableDataSource<any>;
  teacherArray: TeacherModel[] = [];
  teacherSubscription: Subscription;

  /* Differents columns of the table */
  displayedColumns: string[] = ['username', 'first_name', 'last_name', 'email', 'tel', 'gender', 'is_superuser', 'is_staff', 'is_active', 'actions'];

  /** Filter the information in DataTable **/
  applyFilter(filterValue: string) {
    this.TEACHER_DATA.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
              private teacherService: TeachersService,
              private otherService: OtherServiceService,
              public infoBull: MatSnackBar) { }

  ngOnInit() {
    this.GetAllTeacher();
  }

  EditTeacher(teacherdata) {
    const dialogRef = this.dialog.open(CuTeacherComponent, {
      width : '40%',
      height : '70%',
      disableClose : true,
      data : teacherdata,
    });
  }
  /* Open the CU(Create and Update) interface */
  OpenCUMethod() {
    const dialog = this.dialog.open(CuTeacherComponent, {
      width : '40%',
      height : '70%',
      disableClose : true
    });
  }

  GetAllTeacher() {
    /* Call function for take all teachers */
    this.teacherSubscription = this.teacherService.teacherSubject.subscribe(
      (teacher: TeacherModel[]) => {
        // console.log(teacher);
        this.TEACHER_DATA = new MatTableDataSource(teacher);
        this.TEACHER_DATA.paginator = this.paginator;
      }, error => console.log(error));
    this.teacherService.GetAllTeacherArray();
    // this.teacherService.EmitTeacher();
  }
  /* Function that delete a teacher in Data base */
  DeleteMethod(idTeacher) {
    // console.log(idTeacher);
    if (confirm('Are you sure to delete this teacher data ?') === true) {
      this.teacherService.DeleteTeacher(idTeacher)
        .subscribe(data => {
          // console.log(data);
          if (data === 'This teacher data has been deleted.') {
            this.teacherArray = [];
            this.GetAllTeacher();
            this.infoBull.open(data.toString(), 'Close', {
              duration: 3000
            });
          }
        }, error => {
          this.infoBull.open('Server Error!', 'Close', {
            duration: 3000
          });
          console.log(error);
        });
    }
  }
}
