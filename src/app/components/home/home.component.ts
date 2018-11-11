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

  iBeaconAndroid: any;
  iBeaconsAndroid: iBeacon[];

  iBeaconiOS: any;
  iBeaconsiOS: iBeacon[];
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) {
    localStorage.removeItem('firebase:previous_websocket_failure');
  }

  ngOnInit() {
    this.courseService.getiBeaconAndroid().valueChanges().subscribe(iba => {
      this.iBeaconsAndroid = iba;
      this.iBeaconAndroid = iba.length;
    });
    this.courseService.getiBeaconiOS().valueChanges().subscribe(ibo => {
      this.iBeaconsiOS = ibo;
      this.iBeaconiOS = ibo.length;
    });
    this.formBeacon();
  }
  formBeacon(){
    this.ibeaconForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      platform: ['', Validators.required]
    });
  }

  createiBeacon(){
    this.courseService.insertIBeacon(this.ibeacon, this.selectPlatform);
    this.ibeaconForm.reset();
  }
  deleteiBeaconAndroid(iBeaconID: any){
    this.courseService.deleteiBeaconAndroid(iBeaconID);
  }
  deleteiBeaconiOS(iBeaconID: any){
    this.courseService.deleteiBeaconiOS(iBeaconID);
  }
}
