import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor() {
    localStorage.removeItem('firebase:previous_websocket_failure');
  }
  ngOnInit(){}
}
