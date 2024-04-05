import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { user } from '../shared/models/User';
import { Iuserlogin } from '../shared/Interface/Iuser.login';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/url';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/Interface/IuserRegister';
import { USER_REGISTER_URL } from '../constants/url';

// Define user key for local storage
const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private userSubject = new BehaviorSubject<user>(this.getUserFromLocalStorage());
  public userObservable: Observable<user>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): user {
    return this.userSubject.value;
  }

  // Login service
  login(userLogin: Iuserlogin): Observable<user> {
    return this.http.post<user>(USER_LOGIN_URL, userLogin).pipe(
      // for toastr
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }

  // Logout service
  logout() {
    this.userSubject.next(new user());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  // Set item in localStorage
  private setUserToLocalStorage(user: user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Get Item in localStorage
  private getUserFromLocalStorage(): user {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as user;
    return new user();
  }

  register(userRegiser: IUserRegister): Observable<user> {
    return this.http.post<user>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the Foodmine ${user.name}`,
            'Register Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        }
      })
    );
  }
}
