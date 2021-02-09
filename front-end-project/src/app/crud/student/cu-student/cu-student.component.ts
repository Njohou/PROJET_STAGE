import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentModel } from '../../../models/student/student.model';
import { StudentsService } from '../../../services/student/students.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClassService} from '../../../services/classes/class.service';
import {GetClassesModel} from '../../../models/class/getclasses.models';
import * as moment from 'moment';
import {OtherServiceService} from "../../../services/other/other-service.service";

@Component({
  selector: 'app-cu-student',
  templateUrl: './cu-student.component.html',
  styleUrls: ['./cu-student.component.scss']
})
export class CuStudentComponent implements OnInit {

  registerForm: FormGroup;
  classArray: GetClassesModel[] = [];
  classTaken: GetClassesModel;
  idCourse: number[] = [];
  dateofBirth: string;
  idAdmin: string;

  constructor(private formBuiler: FormBuilder,
              private studentsService: StudentsService,
              private classeService: ClassService,
              private otherService: OtherServiceService,
              private infobull: MatSnackBar,
              private dialogRef: MatDialogRef<CuStudentComponent>,
              @Inject(MAT_DIALOG_DATA) public Studentdata: any) { }

  ngOnInit() {
    this.idAdmin = localStorage.getItem('id');
    this.RegisterStudentForm();
    this.GetAllClasses();
    if (this.Studentdata) {
      this.registerForm.setValue({
        regis_number : this.Studentdata.regis_number,
        first_name : this.Studentdata.first_name,
        last_name : this.Studentdata.last_name,
        tel : this.Studentdata.tel,
        // my_class : this.Studentdata.my_class,
        my_class : this.Studentdata.student_class,
        dateOfBirth : this.Studentdata.dateOfBirth,
        gender : this.Studentdata.gender,
        is_active : this.Studentdata.is_active,
        is_staff : this.Studentdata.is_staff,
        is_superuser : this.Studentdata.is_superuser,
      });
    } else {
      return;
    }
  }

  RegisterStudentForm() {
    this.registerForm = this.formBuiler.group({
      regis_number : ['', Validators.required],
      first_name : ['', Validators.required],
      last_name : ['', Validators.required],
      tel : ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
      my_class: ['', Validators.required],
      dateOfBirth : ['', Validators.required],
      gender: ['', Validators.required],
      is_active : ['true', Validators.required],
      is_staff: ['false', Validators.required],
      is_superuser: ['false', Validators.required]
    });
  }

  /* Function that send student information to back end */
  OnSubmitForm() {
    /* Function which convert a string value to boolean */
    function convert(value) {
      if (value === 'true' || value === 'true') {
        return true;
      } else {
        return false;
      }
    }

    /* Function that generates a 10-character password */
    function makePassword() {
      let text = '';
      const lettre = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@/#&$|+?!';

      for (let i = 0; i < 10; i++) {
        text += lettre.charAt(Math.floor(Math.random() * lettre.length));
      }

      return text;
    }
    const password = makePassword();
    /* End */

    if (this.registerForm.invalid) {return; }

    this.classTaken = this.registerForm.get('my_class').value;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.classTaken.all_courses.length; i++) {
      this.idCourse.push(this.classTaken.all_courses[i].id);
    }

    this.dateofBirth = moment(this.registerForm.get('dateOfBirth').value).format('YYYY-MM-DD');

    // console.log(this.registerForm.get('dateOfBirth').value);
    // console.log(this.classTaken.id + ' , ' + this.idCourse);
    /* Retrieve values from the form */
    const student = new StudentModel( this.registerForm.get('regis_number').value,
                                      this.registerForm.get('regis_number').value,
                                      this.registerForm.get('first_name').value,
                                      this.registerForm.get('last_name').value,
                                      password,
                                      this.registerForm.get('tel').value,
                                      this.dateofBirth,
                                      this.registerForm.get('gender').value,
                                      convert(this.registerForm.get('is_active').value),
                                      convert(this.registerForm.get('is_staff').value),
                                      convert(this.registerForm.get('is_superuser').value),
                                      this.classTaken.id,
                                      parseInt(this.idAdmin),
                                      this.idCourse);
    console.log(student);
    /* Send informations */
    this.studentsService.CreateStudent(student)
      .subscribe((data) => {
        // console.log(data);
        this.studentsService.studentArray.push(data);
        this.infobull.open(data.first_name + ' ' + data.last_name + ' has been created !', 'Close', {
          duration: 3000
        });
        this.ClosePopup();
        this.studentsService.EmitStudent();
      }, (error) => {
        if (error.error.username) {
          this.infobull.open('ERROR : ' + error.error.username[0], 'Close', {
            duration: 3000
          });
        }
        console.log(error);
      });
  }


  /* Update function  */
  OnUpdateForm() {
    if (this.registerForm.invalid) { return; }

    function convert(value) {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else if (value === false) {
        return false;
      } else if (value === true) {
        return true;
      }
    }
    this.classTaken = this.registerForm.get('my_class').value;
    this.dateofBirth = moment(this.registerForm.get('dateOfBirth').value).format('YYYY-MM-DD');

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.classTaken.all_courses.length; i++) {
      this.idCourse.push(this.classTaken.all_courses[i].id);
    }
    /* Retrieve values from the form */
    const student = new StudentModel( this.registerForm.get('regis_number').value,
                                      this.registerForm.get('regis_number').value,
                                      this.registerForm.get('first_name').value,
                                      this.registerForm.get('last_name').value,
                                      this.Studentdata.password,
                                      this.registerForm.get('tel').value,
                                      this.dateofBirth,
                                      this.registerForm.get('gender').value,
                                      convert(this.registerForm.get('is_active').value),
                                      convert(this.registerForm.get('is_staff').value),
                                      convert(this.registerForm.get('is_superuser').value),
                                      this.classTaken.id,
                                      parseInt(this.idAdmin),
                                      this.idCourse);

    this.studentsService.UpdateStudent(student, this.Studentdata.id)
      .subscribe(data => {
        // console.log(data);
        this.infobull.open(data.first_name + ' ' + data.last_name + ' has been updated !', 'Close', {
          duration: 3000
        });
        this.ClosePopup();
      }, (error) => {
        if (error.error.username) {
          console.log(error);
          this.infobull.open('ERROR : ' + error.error.username[0], 'Close', {
            duration: 3000
          });
        }
      });
  }

  /* Method that take all class info */
  GetAllClasses() {
    this.classeService.GetAllClasses()
      .subscribe(data => {
        this.classArray = data;
        // console.log(data);
      }, error => console.log(error));
  }

  /* Close the dialog window */
  ClosePopup() {
    this.dialogRef.close();
  }

}
