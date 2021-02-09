import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ClassInfoComponent } from './class-info/class-info.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {CourseEditorComponent} from './course-editor/course-editor.component';
import {ClassViewComponent} from './class-view/class-view.component';
import { AddNoteComponent } from './crud/add-note/add-note.component';
import { CuClassComponent } from './crud/cu-class/cu-class.component';
import {CrudStudentComponent} from './crud/student/crud-student/crud-student.component';
import {CrudTeacherComponent} from './crud/teacher/crud-teacher/crud-teacher.component';
import {HomeComponent} from './home/home.component';
import { CourseCrudComponent } from './crud/course-crud/course-crud.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import {QuizzesComponent} from './quizzes/quizzes.component';
import {BuildQuizComponent} from './quizzes/build-quiz/build-quiz.component';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {QuizDetailComponent} from './quizzes/quiz-detail/quiz-detail.component';
import {DisplayCourseComponent} from './display-course/display-course.component';
import {StudentHomeComponent} from './home/student-home/student-home.component';
import {QuizResultComponent} from './quizzes/quiz-result/quiz-result.component';
import {AuthGuardService, LoginGuardService} from './services/auth-guard/auth-guard.service';
import {AdminPanelComponent} from './home/admin-panel/admin-panel.component';
import {OnlyStudentGuardGuard} from './services/user-guard/only-student-guard.guard';
import {StaffGuardGuard} from './services/user-guard/staff-guard.guard';
import {OnlyStaffGuardGuard} from './services/user-guard/only-staff-guard.guard';
import {AdminGuardGuard} from './services/user-guard/admin-guard.guard';
import {StudentGuardGuard} from './services/user-guard/student-guard.guard';
import {QuizHistoricComponent} from "./quiz-historic/quiz-historic.component";
import {CourseEditorUpdateComponent} from "./course-editor-update/course-editor-update.component";


const routes: Routes = [
  {
    path : 'navMenu/teacher-home',
    component : HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path : 'navMenu/admin-panel',
    component : AdminPanelComponent,
    canActivate: [AuthGuardService],
  },
  {
    path : 'navMenu/class-view',
    component : ClassViewComponent,
  },
  {
    path : 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  {
    path : 'navMenu',
    component: MainNavComponent,
    canActivate: [AuthGuardService, LoginGuardService],
  },
  {
    path : 'navMenu/home-student',
    component: StudentHomeComponent,
    canActivate: [AuthGuardService, OnlyStudentGuardGuard],
  },
  {
    path : 'quiz-result',
    component: QuizResultComponent,
    canActivate: [AuthGuardService, OnlyStudentGuardGuard],
  },
  {
    path : 'navMenu/class-info/:id',
    component: ClassInfoComponent,
    canActivate: [AuthGuardService, StaffGuardGuard],
  },
  {
    path : 'navMenu/add-note/:id',
    component: CourseEditorComponent,
    canActivate: [AuthGuardService, OnlyStaffGuardGuard],
  },
  {
    path : 'navMenu/update-note/:id',
    component: CourseEditorUpdateComponent,
    canActivate: [AuthGuardService, OnlyStaffGuardGuard],
  },
  {
    path : 'navMenu/add-mark/:id',
    component: AddNoteComponent,
    canActivate: [AuthGuardService, OnlyStaffGuardGuard],
  },
  {
    path : 'navMenu/add-class',
    component: CuClassComponent,
    canActivate: [AuthGuardService, AdminGuardGuard],
  },
  {
    path : 'navMenu/student',
    component: CrudStudentComponent,
    canActivate: [AuthGuardService, AdminGuardGuard],

  },
  {
    path : 'navMenu/teacher',
    component: CrudTeacherComponent,
    canActivate: [AuthGuardService, AdminGuardGuard],
  },
  {
    path : 'navMenu/add-course',
    component: CourseCrudComponent,
    canActivate: [AuthGuardService, AdminGuardGuard],
  },
  {
    path : 'navMenu/display-course/:id',
    component: DisplayCourseComponent,
    canActivate: [AuthGuardService, StudentGuardGuard],
  },
{
  path : 'navMenu/course-list',
  component: CoursesListComponent,
  canActivate: [AuthGuardService, StudentGuardGuard],
},
{
  path : 'quiz-item/:id',
  component : QuizzesComponent,
  canActivate: [AuthGuardService, StaffGuardGuard],
},
  {
    path : 'navMenu/quiz/create',
    component : BuildQuizComponent,
    canActivate: [AuthGuardService, OnlyStaffGuardGuard],
  },
  {
    path : 'navMenu/quiz/list',
    component : QuizListComponent,
    canActivate: [AuthGuardService, StudentGuardGuard],
  },
  {
    path : 'quiz/participate/:id',
    component : QuizDetailComponent,
    canActivate: [AuthGuardService, OnlyStudentGuardGuard],
  },
  {
    path : 'navMenu/quiz-historic',
    component: QuizHistoricComponent,
    canActivate: [AuthGuardService, OnlyStudentGuardGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
