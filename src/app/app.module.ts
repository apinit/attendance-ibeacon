import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
// Service
import { LoginService } from './shared/login/login.service';
import { CourseService } from './shared/course/course.service';
import { AuthGuard } from './guard/auth.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CourseComponent } from './components/course/course.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';


const router: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'course', component: CourseComponent, canActivate: [AuthGuard]},
  {path: 'course-detail', component: CourseDetailComponent, canActivate: [AuthGuard]},
  {path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CourseComponent,
    AttendanceComponent,
    CourseDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(router),
    ReactiveFormsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)

  ],
  providers: [
    ToastrService,
    LoginService,
    AuthGuard,
    CourseService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
