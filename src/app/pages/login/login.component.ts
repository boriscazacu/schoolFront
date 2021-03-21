import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { SecretSantaService } from '../services/secret-santa.service';
import { SecretSanta } from '../models/secret-santa';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SecretSantaService,
    private notification: NzNotificationService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid) {
      console.log("valid");
      this.login();
    }
  }

  async login() {
    await this.service.nameExist(this.name).then((data) => {
      if(data) {
        this.checkPass()
      } else if (this.password != undefined){
        this.service.add(new SecretSanta(0, this.name, this.password));
        this.router.navigate(['/santa']);
        this.service.nameOfSanta = this.name;
      } else {
        this.notification.create(
          "error",
          'Create',
          'Introduce-ți și o parolă !!'
        );
      }
    })    
  }

  checkPass() {
    this.service.getParticipant(this.name).then((data) => {     
      if (this.password === data.password) {
        this.router.navigate(['/santa']);
        this.service.nameOfSanta = this.name;
        this.notification.create(
          "success",
          'Login',
          'V-ați logat cu succes !!'
        );
      } else if (this.password != undefined) { // Functional adaugat pentru test
        data.password = this.password;
        this.service.edit(data);
        this.service.nameOfSanta = this.name;
        this.router.navigate(['/santa']);
        this.notification.create(
          "success",
          'Login',
          'V-ați logat cu succes !! ' + this.password
        );        
      } else {  // Functional adaugat pentru test 
        this.notification.create(
          "error",
          'Login',
          'Parola este incorectă !!'
        );
      }
    }).catch(() => {
      this.notification.create(
        "error",
        'Create',
        'A apărut o eroare încercați mai târziu !!'
      );
    })
  }

  get name(): string {
    return this.validateForm.get('userName').value;
  }
  get password(): any {
    return this.validateForm.get('password').value;
  } 

}