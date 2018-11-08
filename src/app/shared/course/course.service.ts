import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Course, Student, Schedule, iBeacon } from '../models';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class CourseService {

  courseId: string;
  courseDetails: Course;
  course: Course = new Course();
  schedule: Schedule[];
  date: any;
  userUid: string;
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe((auth) => {
      if(auth){
        this.userUid = auth.uid;
      }
    });
  }

  createCourse(course: Course){
    this.db.object(`Class_Attendance/${this.userUid}/Course/${course.id}/`).set({
      id: course.id,
      name: course.name,
      group: course.group,
      semester: course.semester,
      year: course.year
    }).then(() => {
      this.toastr.success('เพิ่มรายวิชาสำเร็จ', 'Success');
    }).catch((err) => {
      this.toastr.error(err.code, 'Error');
    });
  }

  updateCourse(course: Course){
    this.db.object(`Class_Attendance/${this.userUid}/Course/${course.id}/`).update({
      id: course.id,
      name: course.name,
      group: course.group,
      semester: course.semester,
      year: course.year
    }).then(() => {
      this.toastr.success('บันทึกการเปลี่ยนแปลงเสร็จสิ้น', 'Success');
    }).catch((err) => {
      this.toastr.error(err.code, 'Error');
    });
  }

  deleteCourse(id: any){
    this.db.object(`Class_Attendance/${this.userUid}/Course/${id}`).remove()
      .then(() => {
        this.db.object(`Class_Attendance/${this.userUid}/Course-set`).remove().then(() => {
          this.router.navigate(['/course']);
        });
        this.toastr.success('ลบรายวิชาสำเร็จ');
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Something went wrong please Try again!!', 'Error')
      });
  }

  setCourseSelected(course: Course){
    this.db.object(`Class_Attendance/${this.userUid}/Course-set/`).set({
      id: course.id
    }).then(() => {
      this.router.navigate(['/course-detail']);
    });
  }

  getCourseSet(){
    return this.db.object(`Class_Attendance/${this.userUid}/Course-set/id`);
  }
  getCourseList(){
    return this.db.list(`Class_Attendance/${this.userUid}/Course/`);
  }
  getOneCourse(courseId: any){
    return this.db.object(`Class_Attendance/${this.userUid}/Course/${courseId}`);
  }
  getStudentsList(courseId: any){
    return this.db.list(`Class_Attendance/${this.userUid}/Course/${courseId}/Students`);
  }
  insertStudent(student: Student, courseId: any){
    let studentId = student.id;
    this.db.object(`Class_Attendance/${this.userUid}/Course/${courseId}/Students/${student.id}/`).set({
      id: student.id,
      name: student.name
    }).then(() => {
      this.toastr.success('เพิ่มนักศึกษาสำเร็จ');
      this.getScheduleDate(courseId).valueChanges().subscribe(schedule => {
        this.schedule = schedule;
        for(let i = 0; i < this.schedule.length; i++){
          this.addCheckAfterInsertStudent(courseId, studentId, this.schedule[i].date);
        }
      });
    }).catch((err) => {
      console.log('Error happen for insert student!!!');
    });
  }
  getScheduleDate(courseId: any){
    return this.db.list(`Class_Attendance/${this.userUid}/Course/${courseId}/schedule/attendance/`);
  }

  getCurrentDate(){
    let tr = new Date();
    this.date = this.datePipe.transform(tr, 'dd-MM-yyyy');
    return this.date;
  }

  createCheckClass(courseId: any, studentId: any){
    let dateCurrent = this.getCurrentDate();
    this.db.object(`Class_Attendance/${this.userUid}/Course/${courseId}/Students/${studentId}/attendance/${dateCurrent}/`)
    .set({
      date: dateCurrent,
      score: 0
    }).then((res) => {
      this.addSchedule(courseId , dateCurrent);
    }).catch((err) => {
      console.log(err);
    });
  }
  addSchedule(courseId: any, date: any){
    this.db.object(`Class_Attendance/${this.userUid}/Course/${courseId}/schedule/attendance/${date}`).set({
      date: date
    });
  }

  addCheckAfterInsertStudent(courseId: any, studentId: any, date: any){ // when add student after check class
    this.db.object(`Class_Attendance/${this.userUid}/Course/${courseId}/Students/${studentId}/attendance/${date}/`)
    .set({
      date: date,
      score: 0
    });
  }

  insertIBeacon(courseId: any, ibeacon: iBeacon, platform: any){
    this.db.object(`Class_Attendance/${this.userUid}/iBeacon/${platform}/${ibeacon.id}/`).set({
      id: ibeacon.id,
      name: ibeacon.name
    }).then(() => {
      this.toastr.success('Add iBeacon Success');
    });
  }
  getIBeaconList(){
    return this.db.list(`Class_Attendance/${this.userUid}/iBeacon/ios/`);
  }
  getiBeaconAndroid(){
    return this.db.list(`Class_Attendance/${this.userUid}/iBeacon/android/`);
  }
}
