import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cart } from '../shared/models/cart';
import { CartItems } from '../shared/models/cartItems';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(food: Food): void {
    let cartItem = this.cart.items
      .find(item => item.food.id === food.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItems(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items
      .find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new cart();
  }
}