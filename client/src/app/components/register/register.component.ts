import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  facebook_login: string;
  twitter_login: string;

  constructor(private validateservice: ValidateService,
              private flashmessage: FlashMessagesService,
              private authservice: AuthService,
              private router: Router ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const newUser ={
      email: this.email,
      password: this.password,
      facebook_login: this.facebook_login,
      twitter_login: this.twitter_login
    }

    //filling all required fields
    if(!this.validateservice.validateRegister(newUser)){
      this.flashmessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //validate email
    if(!this.validateservice.validateEmail(newUser.email)){
      this.flashmessage.show('Please enter valid email address', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //register user
    this.authservice.registerUser(newUser).subscribe(data => {
     this.flashmessage.show('You are now register and can log in', {cssClass: 'alert-success', timeout: 3000});
     this.router.navigate(['/login']);
    },
    error => {
      this.flashmessage.show('Something went wwrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
    });

  }

}
