import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/course/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course, Student, Attendance, Schedule } from '../../shared/models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  scheduleDate: Schedule[];
  students: Student[];
  courses: Course[];
  courseSelected: Course = new Course();;
  formSelectedCourse: FormGroup;
  constructor(
    private courseService: CourseService,
    private router: Router,
    private fb: FormBuilder
  ) { }

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
    console.log(this.courseSelected.id);
    this.courseService.getStudentsList(this.courseSelected.id).valueChanges().subscribe((student) => {
      this.students = student;
      console.log(student);
    });
    this.courseService.getScheduleDate(this.courseSelected.id).valueChanges().subscribe((schedule) => {
      this.scheduleDate = schedule;
      console.log(schedule);
    });
  }
}
