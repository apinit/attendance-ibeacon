import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/course/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from '../../shared/models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  formCreate: FormGroup;
  course: Course = new Course();
  courses: Course[];
  courseCheck: Course[];
  constructor(
    private courseService: CourseService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form();
    this.courseService.getCourseList().snapshotChanges().subscribe((course) => {
      this.courses = [];
      course.forEach(element => {
        var y = element.payload.toJSON();
        y["id"] = element.key;
        this.courses.push(y as Course);
      });
    });
  }

  form(){
    this.formCreate = this.fb.group({
      id: ['', Validators.compose([
        Validators.required
      ])],
      name: ['', Validators.compose([
        Validators.required
      ])],
      group: ['', Validators.compose([
        Validators.required, Validators.min(1)
      ])],
      semester: ['', Validators.compose([
        Validators.required
      ])],
      year: ['', Validators.compose([
        Validators.required
      ])],
    });
  }
  newCourse(){
    this.courseService.createCourse(this.course);
    this.resetForm();
  }
  resetForm() {
    if (this.formCreate != null) {
      this.formCreate.reset();
    }
  }
  courseSelected(course: Course){
    this.courseService.setCourseSelected(course);
  }
}
