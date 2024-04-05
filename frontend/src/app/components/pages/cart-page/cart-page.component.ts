import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { cart } from 'src/app/shared/models/cart';
import { CartItems } from 'src/app/shared/models/cartItems';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!:cart

  constructor(private cartservice:CartService){
    this.cartservice.getCartObservable().subscribe((cart)=>{this.cart=cart})
  }
  removeFromCart(cartItems:CartItems){
    this.cartservice.removeFromCart(cartItems.food.id)
  }
  changequantity(cartItems:CartItems,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartservice.changeQuantity(cartItems.food.id,quantity)
  }
}
