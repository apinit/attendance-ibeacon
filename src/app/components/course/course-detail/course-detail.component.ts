import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../shared/course/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course, Student } from '../../../shared/models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  coursed: Course;
  formCreate: FormGroup;
  studentForm: FormGroup;
  courseId: string;
  course: Course = new Course();
  student: Student = new Student();

  // courses: Course[];
  students = [];
  constructor(
    private courseService: CourseService,
    private router: Router,
    private fb: FormBuilder
  ) {

   }

  ngOnInit() {
    this.form();
    this.studentForms();
    this.courseService.getCourseSet().valueChanges().subscribe(id => {
      // console.log(id);
      if(id == null){
        this.router.navigate(['/course']);
      }else{
        this.courseService.getOneCourse(id).valueChanges().subscribe(course => {
          this.coursed = course;
          // console.log(course);
          if(course != null){
            this.courseService.getStudentsList(this.coursed.id).valueChanges().subscribe(student => {
              this.students = student;
            });
          }
        });
      }
    });
  }
  studentForms(){
    this.studentForm = this.fb.group({
      id: ['', Validators.compose([
        Validators.required
      ])],
      name: ['', Validators.compose([
        Validators.required
      ])]
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

  onEdit(){
    this.course = Object.assign({}, this.coursed);
  }
  removeCourse(){
    this.courseService.deleteCourse(this.coursed.id);
  }
  newStudent(){
    this.courseService.insertStudent(this.student, this.coursed.id);
    this.studentForm.reset();
  }
  updateCourse(){
    this.courseService.updateCourse(this.course);
    // this.coursed = this.course;
    this.resetForm();
  }
  resetForm() {
    if (this.formCreate != null) {
      this.formCreate.reset();
      // console.log('Reset');
    }
  }
}
