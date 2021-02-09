import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClassesModel } from '../../models/class/classes.model';
import {CoursesService} from '../../services/courses/courses.service';
import {CourseModel} from '../../models/course/courses.model';
import {GetcourseModel} from '../../models/course/getcourses.model';
import {ClassService} from '../../services/classes/class.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClassViewComponent} from '../../class-view/class-view.component';

@Component({
  selector: 'app-cu-class',
  templateUrl: './cu-class.component.html',
  styleUrls: ['./cu-class.component.scss']
})
export class CuClassComponent implements OnInit {

  ClassForm: FormGroup;
  Class: string[] = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];
  ClassNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  serial: string[] = ['A4', 'C', 'D', 'TI'];
  options: string[] = ['All', 'Esp', 'Arb'];
  isSerie = true;
  isOption = true;
  serieTake: string;
  courseList: GetcourseModel[] = [];
  TakeCourseSelected: GetcourseModel[] = [];
  idTeacherarray: number[] = [];
  idCourserarray: number[] = [];
  id: number[] = [];
  idAdmin: number;

  constructor(private formBuilder: FormBuilder,
              private courseService: CoursesService,
              private classesService: ClassService,
              private infoBull: MatSnackBar,
              public dialogRef: MatDialogRef<CuClassComponent>,
              @Inject(MAT_DIALOG_DATA) public classData: any) { }

  ngOnInit() {
    this.idAdmin = parseInt(localStorage.getItem('id'));
    this.ClassesForm();
    this.TakeCourse();
    this.PopulateForm();
  }

  ClassesForm() {
    this.ClassForm = this.formBuilder.group({
      class_number : ['', Validators.required],
      option : [''],
      level : ['', Validators.required],
      serie : [''],
      coursesList: ['', Validators.required],
    });
  }

  /* Form to subscribe class data */
  OnSubmitForm() {
    if (this.ClassForm.invalid) { return; }
    // console.log('OK');
    // console.log(this.ClassForm.get('coursesList').value);

    this.TakeCourseSelected = this.ClassForm.get('coursesList').value;

    for(var i = 0; i < this.TakeCourseSelected.length; i++) {
      this.idCourserarray.push(this.TakeCourseSelected[i].id);
      this.idTeacherarray.push(this.TakeCourseSelected[i].course_teacher.id);
    }

    // console.log(this.idCourserarray + ' , ' + this.idTeacherarray);

    const classes = new ClassesModel(
      this.ClassForm.get('class_number').value,
      this.ClassForm.get('option').value,
      this.ClassForm.get('level').value,
      this.ClassForm.get('serie').value,
      this.idCourserarray,
      this.idTeacherarray,
      this.idAdmin
    );
    // console.log(classes);
    this.classesService.CreateClass(classes)
      .subscribe((data) => {
        // console.log(data);
        this.infoBull.open(data.level + ' ' + data.class_number + ' has been created !', 'Close', {
          duration: 3000
        });
        this.classesService.classArray.push(data);
        this.classesService.EmitClass();
        this.ReturnFunct();
      }, (error) => {
        if (error.error.non_field_errors) {
          this.infoBull.open('ERROR : ' + error.error.non_field_errors[0].toString(), 'Close', {
            duration: 4000
          });
        }
        console.log(error);
      });
  }

  OnUpdateForm() {
    if (this.ClassForm.invalid) { return; }
    // console.log(this.ClassForm.get('coursesList').value);

    this.TakeCourseSelected = this.ClassForm.get('coursesList').value;

    for (var i = 0; i < this.TakeCourseSelected.length; i++) {
      this.idCourserarray.push(this.TakeCourseSelected[i].id);
      this.idTeacherarray.push(this.TakeCourseSelected[i].course_teacher.id);
    }

    // console.log(this.idCourserarray + ' , ' + this.idTeacherarray);

    const classes = new ClassesModel(
      this.ClassForm.get('class_number').value,
      this.ClassForm.get('option').value,
      this.ClassForm.get('level').value,
      this.ClassForm.get('serie').value,
      this.idCourserarray,
      this.idTeacherarray,
      this.idAdmin
    );
    // console.log(this.classData.id);
    this.classesService.UpdateClass(classes, this.classData.id)
      .subscribe((data) => {
        // console.log(data);
        this.infoBull.open(data.level + ' ' + data.class_number + ' has been updated !', 'Close', {
          duration: 3000
        });
        this.ReturnFunct();
      }, (error) => {
        if (error.error.non_field_errors) {
          this.infoBull.open('ERROR : ' + error.error.non_field_errors[0].toString(), 'Close', {
            duration: 4000
          });
        }
        console.log(error);
      });
  }

  /* Take serie in the form */
  TakeSerie(serie) {
    this.serieTake = serie;
    if (serie === 'C' || serie === 'D' || serie === 'TI') {
      this.isOption = false;
    } else {
      this.isOption = true;
    }
  }

  /* Take all courses in Data base */
  TakeCourse() {
    this.courseService.GetAllCourses()
      .subscribe((data) => {
        this.courseList = data;
        // console.log(this.courseList);
      }, error => console.log(error));
  }

  /* Verification for disable field */
  disableSerie(value) {
    // console.log(value);
    // console.log(this.serieTake);
    if (value === '6ème' || value === '5ème') {
      this.isSerie = false;
      this.isOption = false;
    } else if (value === '4ème' || value === '3ème') {
      this.isSerie = false;
      this.isOption = true;
    } else if ((value === '2nde' || value === '1ère' || value === 'Tle') && this.isOption === true) {
      this.isSerie = true;
    } else if ((value === '2nde' || value === '1ère' || value === 'Tle') && this.isSerie === true) {
      this.isOption = false;
    } else {
      this.isSerie = true;
      this.isOption = true;
    }
  }

  PopulateForm() {
    if (this.classData) {
      // console.log(this.classData);
      this.ClassForm.setValue({
        class_number: this.classData.class_number,
        option: this.classData.option,
        level: this.classData.level,
        serie: this.classData.serie,
        coursesList: this.classData.all_courses
      });
      this.disableSerie(this.classData.level);
    } else {
      return;
    }
  }

  ReturnFunct() {
    this.dialogRef.close();
  }

}
