import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/course/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course, Student, Attendance, Schedule } from '../../shared/models';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  date: any;
  len = 0;
  submitCourse = false;
  today = true;
  isChange = false;

  isScheduleDate = false;
  scheduleDate: Schedule[];
  students: Student[];
  courses: Course[];
  courseSelected: Course = new Course();
  formSelectedCourse: FormGroup;
  constructor(
    private courseService: CourseService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.form();
    this.courseService.getCourseList().valueChanges().subscribe(course => {
      this.courses = course;
    });
  }
  form(){
    this.formSelectedCourse = this.fb.group({
      id: ['', Validators.required]
    });
  }
  courseSelect(){
    this.isChange = false;
    this.submitCourse = true;
    let dateCheck = this.getCurrentDate();
    this.students = [];
    this.scheduleDate = [];

    this.courseService.getStudentsList(this.courseSelected.id).valueChanges().subscribe((student) => {
      this.students = [];
      this.students = student;
      this.len = this.students.length;
    });
    this.courseService.getScheduleDate(this.courseSelected.id).valueChanges().subscribe((schedule) => {
      this.scheduleDate = [];
      this.scheduleDate = schedule;
      if(this.scheduleDate.length > 0){
        this.scheduleDate.forEach((date) => {
          if(date.date == dateCheck){
            this.today = false;
          }else{
            this.today = true;
          }
        });
      }else{
        this.today = true;
      }
    });
  }
  change(){
    this.isChange = true;
  }
  addCheck(){
    for(let i = 0; i < this.students.length; i++){
      this.courseService.createCheckClass(this.courseSelected.id, this.students[i].id);
    }
    this.submitCourse = false;
  }

  getCurrentDate(){
    let tr = new Date();
    this.date = this.datePipe.transform(tr, 'dd-MM-yyyy');
    return this.date;
  }
}
