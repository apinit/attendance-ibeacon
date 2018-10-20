import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Course, Student } from '../models';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class CourseService {

  courseId: string;
  courseDetails: Course;
  course: Course = new Course();
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // operate(course: Course){
  //   if(course.id == null || course.id == undefined){
  //     this.createCourse(course);
  //   }else{
  //     this.updateCourse(course);
  //   }
  // }

  createCourse(course: Course){
    this.db.object(`Course/${course.id}/`).set({
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
    this.db.object(`Course/${course.id}/`).update({
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
    this.db.object(`Course/${id}`).remove()
      .then((res) => {
        this.router.navigate(['/course']);
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Something went wrong please Try again!!', 'Error')
      });
  }



  setCourseSelected(course: Course){
    this.courseDetails = course;
    this.courseId = course.id;
    this.router.navigate(['/course-detail']);
    // this.db.object(`Coure-set/id/`).set({
    //   id: course.id
    // }).then(() => {
    //   this.router.navigate(['/course-detail']);
    // });
  }
  getCourseSet(){
    return this.db.object(`Coure-set/id/`);
  }
  getCourseDetails(){
    // let id = localStorage.getItem(this.courseId);
    // console.log(id);
    return this.courseDetails;
  }




  getCourseList(){
    return this.db.list(`Course/`);
  }
  getOneCourse(idCourse: any){
    return this.db.object(`Course/${idCourse}`);
  }
  getStudentsList(courseId: any){
    return this.db.list(`Course/${courseId}/Students`);
  }
  insertStudent(student: Student, courseId: any){
    this.db.object(`Course/${courseId}/Students/${student.id}/`).set({
      id: student.id,
      name: student.name
    });
  }
}
