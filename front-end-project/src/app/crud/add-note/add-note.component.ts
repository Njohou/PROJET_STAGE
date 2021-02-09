import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {ClassService} from '../../services/classes/class.service';
import {StudentModel} from '../../models/student/student.model';
import {GetcourseModel} from '../../models/course/getcourses.model';
import {EvaluationService} from '../../services/evaluation/evaluation.service';
import {EvaluationModel} from '../../models/evaluation/evaluation.model';
import * as moment from 'moment';
import {map, startWith} from "rxjs/operators";


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  /* Other variables */
  StudentArray: StudentModel[] = [];
  CourseArray: GetcourseModel[] = [];
  EvaluationsArray: EvaluationModel[] = [];
  dateNow = new Date();
  isStaff: string;
  isSuperuser: string;
  id: string;
  /* End */

  /* Form variables */
  NoteForm: FormGroup;
  sequences: string[] = ['seq 1', 'seq 2', 'seq 3', 'seq 4', 'seq 5', 'seq 6'];
  /* End */
  /* Table variables */
  displayedColumns: string[] = ['name', 'sequence', 'date_eval', 'courseChoose', 'note', 'actions'];
  EVALUATION_DATA: MatTableDataSource<EvaluationModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  /* End */
  Courses: string[] = [
    'English', 'French', 'Chemistry', 'Physic', 'Mathematic',
    'EPS', 'PCT', 'Deutsch', 'Spanish', 'History', 'Geographic',
    'Citizenship'
  ];

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private classService: ClassService,
              private evaluationService: EvaluationService) { }

  ngOnInit() {
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');
    this.id = localStorage.getItem('id');
    this.TakeValueForm();
    this.GetAllStudent();
    this.GetAllEvaluation();
  }

  TakeValueForm() {
    this.NoteForm = this.formBuilder.group({
      name : ['', Validators.required],
      date_Eval : ['', Validators.required],
      note : ['', [Validators.required, Validators.pattern(/^\+?\d+((\.|\,)\d+)?$/)]],
      sequence : ['', Validators.required],
      courseChoose: ['', Validators.required],
    });
  }

  OnsubmitNote() {
    if (this.NoteForm.invalid) {return; }
    const dateEval = moment(this.NoteForm.get('date_Eval').value).format('YYYY-MM-DD');
    const evaluation = new EvaluationModel(dateEval,
                                          this.NoteForm.get('note').value,
                                          this.NoteForm.get('sequence').value,
                                          this.NoteForm.get('name').value,
                                          this.NoteForm.get('courseChoose').value);

    /*console.log(this.NoteForm.get('name').value + ' , ' + this.NoteForm.get('date_Eval').value + ' , ' +
      this.NoteForm.get('note').value + ' , ' + this.NoteForm.get('sequence').value + ' , ' + this.NoteForm.get('courseChoose').value);*/

    this.evaluationService.CreateEvaluation(evaluation)
      .subscribe(data => {
        // console.log(data);
        this.snackBar.open('Mark has been saved !', 'Close', {
          duration: 2000,
        });
      }, error => console.log(error));
  }

  /* Table informations and functions */
  applyFilter(filterValue: string) {
    this.EVALUATION_DATA.filter = filterValue.trim().toLowerCase();
  }
  /* End */

  GetAllStudent() {
    const id  = this.route.snapshot.params.id;
    this.classService.GetSingleClass(id)
      .subscribe((data) => {
        // console.log(data);
        /* Take all students */
        this.StudentArray = data.all_students;
        /* Take all courses of this teacher */
        if (this.isSuperuser === 'true') {
          this.CourseArray = data.all_courses;
        } else {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.all_courses.length; i++) {
            if (this.id === data.all_courses[i].course_teacher.id.toString()) {
              this.CourseArray.push(data.all_courses[i]);
            }
          }
          // console.log(this.CourseArray);
        }
      }, error => console.log(error));
  }

  /* Get all evaluations in database */
  GetAllEvaluation() {
    const id  = this.route.snapshot.params.id;
    this.evaluationService.GetAllEvaluation()
      .subscribe((data) => {
        // console.log(data);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
          if (data[i].student_note.my_class.toString() === id) {
            this.EvaluationsArray.push(data[i]);
          }
        }
        this.EVALUATION_DATA = new MatTableDataSource(this.EvaluationsArray);
        this.EVALUATION_DATA.paginator = this.paginator;
      });
  }

  /* Delete method with id of the evaluation */
  DeleteMethod(idEval) {
    // console.log(idEval);
    if (confirm('Are you sure to delete this course ?') === true) {
      this.evaluationService.DeleteEvaluation(idEval)
        .subscribe(result => {
          // console.log(result);
          this.snackBar.open('This mark has been deleted !', 'close', {
            duration: 3000
          });
        }, error => console.log(error));
    }
  }
}
