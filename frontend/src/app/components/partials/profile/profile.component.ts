import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  registerForm!:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private Userservice: UserserviceService, ){}

    ngOnInit():void{
      let {name,address,email} =  this.Userservice.currentUser
      this.registerForm = this.formBuilder.group({
        name:[name,Validators.required],
        email: [email, [Validators.required, Validators.email]],
        address:[address,Validators.required]
      })
      }
  
      get fc(){
        return this.registerForm.controls
      }
}
