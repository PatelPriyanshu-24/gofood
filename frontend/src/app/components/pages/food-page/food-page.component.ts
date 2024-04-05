import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';
import { HomeComponent } from '../home/home.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent {
  food!: Food;
  constructor(
    activatedRouter: ActivatedRoute,
    foodservice: FoodService,
    private router: Router,
    private cartservice:CartService
  ) {
    activatedRouter.params.subscribe((params) => {
      if (params.id) foodservice.getfoodbyid(params.id).subscribe(serverFood =>{this.food = serverFood});
    });
  }
  addToCart() {
    this.cartservice.addToCart(this.food)
    this.router.navigate(['/cart-page'])
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
