import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})

export class LoginPageComponent {
  loginForm!: FormGroup;
  issubmited = false;
  returnUrl = "";
  constructor(
    private formbuilder: FormBuilder,
    private userService: UserserviceService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl
  }

  get fc() {
    return this.loginForm.controls;
  }
  submit() {
    this.issubmited = true;
    if (this.loginForm.invalid) return;
    this.userService.login({
      email: this.fc.email.value,
      password: this.fc.password.value,
    }).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl)
    })
  }
}
