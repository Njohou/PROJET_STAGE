import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TeacherModel} from '../../../models/teacher/teacher.model';
import {CourseModel} from '../../../models/course/courses.model';
import {TeachersService} from '../../../services/teacher/teachers.service';
import {CoursesService} from '../../../services/courses/courses.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, Subject, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {OtherServiceService} from "../../../services/other/other-service.service";
import {GetcourseModel} from "../../../models/course/getcourses.model";

@Component({
  selector: 'app-cu-course-popup',
  templateUrl: './cu-course-popup.component.html',
  styleUrls: ['./cu-course-popup.component.scss']
})
export class CuCoursePopupComponent implements OnInit {
  CourseForm: FormGroup;
  update = false;
  idarea: number[] = [];
  filteredOptions: Observable<string[]>;
  idAdmin: number;

  Courses: string[] = [
    'English', 'French', 'Chemistry', 'Physic', 'Mathematic',
    'EPS', 'PCT', 'Deutsch', 'Spanish', 'History', 'Geographic',
    'Citizenship'
  ];
  teachers: TeacherModel[] = [];

  constructor(private formBuilder: FormBuilder,
              private teacherService: TeachersService,
              private courseService: CoursesService,
              private otherService: OtherServiceService,
              private dialogRef: MatDialogRef<CuCoursePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public coursedata: any,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.CourseFormValue();
    this.GetAllTeachers();
    this.PopulateForm();
    this.FilterMethod();
    this.idAdmin = parseInt(localStorage.getItem('id'));
    // console.log(this.idAdmin + ' , ' + typeof (this.idAdmin));
  }

  FilterMethod() {
    /* Autocompletion */
    this.filteredOptions = this.CourseForm.get('course').valueChanges
      .pipe(startWith(''),
        map(value => this.FilterValue(value))
      );
    /* End */
  }
  /* Autocompletion too */
  private FilterValue(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.Courses.filter(option => option.toLowerCase().includes(filterValue));
  }
  /* End */

  PopulateForm() {
    console.log(this.coursedata);
    if (this.coursedata) {
      this.CourseForm.setValue({
        course : this.coursedata.entitled,
        coef : this.coursedata.coefficient,
        teacher_id : this.coursedata.course_teacher
      });
    } else {
      return;
    }
  }

  CourseFormValue() {
    this.CourseForm = this.formBuilder.group({
      course: new FormControl('', Validators.required),
      coef: ['', [Validators.required, Validators.max(6), Validators.min(1)]],
      teacher_id: ['', Validators.required]
    });
  }

  OnSubmitForm() {
    if (this.CourseForm.invalid) { return; }

    /*console.log(
      this.CourseForm.get('course').value + ' , ' +
      this.CourseForm.get('coef').value + ' , ' + this.CourseForm.get('teacher_id').value);*/
    this.idarea.push(this.CourseForm.get('teacher_id').value);
    const courses = new CourseModel(this.CourseForm.get('course').value,
                                    this.CourseForm.get('coef').value,
                                    this.CourseForm.get('teacher_id').value,
                                    this.idAdmin
                                  );

    this.courseService.CreateCourse(courses)
      .subscribe((data: GetcourseModel) => {
          this.courseService.courseArray.push(data);
          // console.log(data);
          this.snackBar.open(data.entitled + ' has been created !', 'Close', {
            duration: 2500,
          });
          this.ClosePopup();
          this.courseService.EmitCourse();
        },
        error => console.log(error));
  }

  OnUpdateForm() {
    if (this.CourseForm.invalid) {return; }

    /*console.log(
      this.CourseForm.
      get('course').value + ' , ' + this.CourseForm.get('coef').value + ' , ' + this.CourseForm.get('teacher_id').value
    );*/
    this.idarea.push(this.CourseForm.get('teacher_id').value);
    const courses = new CourseModel(this.CourseForm.get('course').value,
                                    this.CourseForm.get('coef').value,
                                    this.CourseForm.get('teacher_id').value,
                                    this.idAdmin);

    this.courseService.UpdateCourse(this.coursedata.id, courses)
      .subscribe((data) => {
        this.snackBar.open(data.entitled + ' has been updated !', 'Close', {
          duration: 3000
        });
        // console.log(data);
        this.ClosePopup();
      }, error => console.log(error));
  }

  /* Get all teachers in Data base */
  GetAllTeachers() {
    this.teacherService.GetAllTeacher()
      .subscribe((data) => {
        this.teachers = data;
      }, (error => console.log(error)));
  }

  ClosePopup() {
    this.dialogRef.close();
  }

}
