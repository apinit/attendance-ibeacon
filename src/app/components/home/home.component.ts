import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { iBeacon, Course } from '../../shared/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../shared/course/course.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courseSelected: Course = new  Course();
  selectPlatform: string;
  courses: Course[];
  ibeacon: iBeacon = new iBeacon();
  ibeaconForm: FormGroup;
  platforms = ['ios', 'android'];
  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.courseService.getCourseList().valueChanges().subscribe(course => {
      this.courses = course;
    });
    this.formBeacon();
  }

  formBeacon(){
    this.ibeaconForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      course: ['', Validators.required],
      platform: ['', Validators.required]
    });
  }

  createiBeacon(){
    this.courseService.insertIBeacon(this.courseSelected.id, this.ibeacon, this.selectPlatform);
    this.ibeaconForm.reset();
  }
}
