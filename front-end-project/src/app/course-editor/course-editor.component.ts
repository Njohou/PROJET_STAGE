import {Component, OnInit} from '@angular/core';
import {NoteService} from '../services/notes/note.service';
import {ChapterModel} from '../models/chapter/chapters.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursesService} from '../services/courses/courses.service';
import {ActivatedRoute} from '@angular/router';
import {ClassService} from '../services/classes/class.service';
import {GetcourseModel} from '../models/course/getcourses.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../services/notifications/notification.service';
import {NotificationPostModel} from '../models/notification/notificationPost.model';

declare var CKEDITOR: any;
@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit {
  NoteForm: FormGroup;
  courses: GetcourseModel[] = [];
  isStaff: string;
  isSuperuser: string;
  id: string;
  idClass: number;

  constructor(private noteService: NoteService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private courseService: CoursesService,
              private classService: ClassService,
              private notificationService: NotificationService,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');
    this.id = localStorage.getItem('id');
    this.getCoursesData();
    this.initCourseEditor();
    this.noteForm();
  }

  initCourseEditor() {
    CKEDITOR.on('instanceCreated', (event) => {
      const editor = event.editor;
      editor.name = 'content';
    });
  }

  getCoursesData() {
    this.idClass = this.route.snapshot.params['id'];
    this.classService.GetSingleClass(this.idClass)
      .subscribe((data) => {
        // console.log(data);
        if (this.isSuperuser === 'true') {
          this.courses = data.all_courses;
        } else {
          for (var i = 0; i < data.all_courses.length; i++) {
            if (this.id === data.all_courses[i].course_teacher.id.toString()) {
              this.courses.push(data.all_courses[i]);
            }
          }
          // console.log(this.courses);
        }
      });
  }

  noteForm() {
    this.NoteForm = this.formBuilder.group({
        entitled : ['', Validators.required ],
        text : ['', Validators.required],
        course: ['', Validators.required]
      }
    );
  }

  OnSubmitForm() {
    if (this.NoteForm.invalid) {return; }
    this.getData();
  }

  getData() {
    const note = new ChapterModel(this.NoteForm.get('entitled').value,
                                  this.NoteForm.get('text').value,
                                  this.NoteForm.get('course').value);

    console.log(note);
    this.noteService.CreateNote(note)
      .subscribe(
        (data: any) => {
          // console.log(data);
          const notification = new NotificationPostModel(
            note.entitled + ' note has been added',
            false,
            +this.id,
            this.idClass
          );
          this.notificationService.postNotification(notification).subscribe(
            () => {console.log('notification has been sent successfully!'); },
            (error) => { console.log(error); }
          );
          this.snack.open(data.entitled + ' are been saved !', 'Close', {
            duration: 3000
            });
          },
        (error) => {console.log(error); }
      );
  }
}
