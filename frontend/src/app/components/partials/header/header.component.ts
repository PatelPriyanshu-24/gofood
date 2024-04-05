import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserserviceService } from 'src/app/services/user.service';
import { user } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   User!:user  
  cartQuantity=0;
  constructor(cartService:CartService, private userService:UserserviceService, private router:Router){
    cartService.getCartObservable().subscribe((newCart)=>{
      this.cartQuantity = newCart.totalCount;
    })
    userService.userObservable.subscribe((newUser)=>{
     this.User = newUser
     this.isAuth
     
    })
  }
logout(){
  this.userService.logout();
}
get isAuth(){
  return this.User.id;
}
}
