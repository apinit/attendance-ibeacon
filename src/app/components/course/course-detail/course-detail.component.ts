import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../shared/course/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course, Student } from '../../../shared/models';
import { Router } from '@angular/router';
import * as XLSX from 'ts-xlsx';
import { ExcelService } from '../../../shared/excel/excel.service';
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
  studentsList: Student[];

  arrayBuffer: any;
  file: File;
  selected = false;
  json: Course;

  // courses: Course[];
  students = [];
  constructor(
    private courseService: CourseService,
    private router: Router,
    private fb: FormBuilder,
    private excel: ExcelService
  ) { }

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
          this.students = [];
          if(course != null){
            this.courseService.getStudentsList(this.coursed.id).valueChanges().subscribe(student => {
              this.students = student;
              // console.log(student);
            });
          }else{
            this.router.navigate(['/course']);
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
    this.resetForm();
  }
  resetForm() {
    if (this.formCreate != null) {
      this.formCreate.reset();
      // console.log('Reset');
    }
  }
  chooseFile(event) {
    this.file = event.target.files[0];
    this.selected = true;
  }
  Upload() {
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var sheet = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[sheet];
        this.studentsList = [];
        XLSX.utils.sheet_to_json(worksheet,{raw:true}).forEach((item) => {
          this.studentsList.push(item);
        });
        this.save();
    }
    fileReader.readAsArrayBuffer(this.file); // read file
  }
  save(){
    if(this.studentsList.length > 0){
      for(let i = 0;i < this.studentsList.length; i++){
        if(this.studentsList[i].id != undefined && this.studentsList[i].name != undefined){
          this.courseService.insertStudent(this.studentsList[i], this.coursed.id);
        }
      }
    }
  }
}
