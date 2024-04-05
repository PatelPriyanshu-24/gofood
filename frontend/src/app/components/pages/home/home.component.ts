import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  food: Food[] = [];
  

  constructor(
    private foodservice: FoodService,
    activatedRouter: ActivatedRoute
  ) {
    let FoodObservable:Observable<Food[]> 
    activatedRouter.params.subscribe((params) => {
      if (params.searchTerm){
        FoodObservable = this.foodservice.getAllFoodBySearchTerm(params.searchTerm);
      } 
      else if(params.tag){
        FoodObservable=this.foodservice.getallfoodbytag(params.tag)
      }
                                                                                                                                                                                                                                                                              
      else FoodObservable = foodservice.getall();  

      FoodObservable.subscribe((serverFood)=>{
        this.food = serverFood
      })
    });
  }
  ngOnInit(): void {}
  toggleFavorite(food: Food) {
    food.favorite = !food.favorite;
  }
}
