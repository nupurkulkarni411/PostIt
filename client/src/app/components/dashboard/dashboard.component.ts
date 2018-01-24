import { Component, OnInit } from '@angular/core';
import {FacebookService} from '../../services/facebook.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private facebookservice: FacebookService,
              private router: Router) { }

  ngOnInit() {
  }

  post(){
    this.facebookservice.getFacebooktoken().subscribe(data=>{
      if(data.success){
        console.log('done');
      }
    });
  }
}
