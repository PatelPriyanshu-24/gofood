import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent {
  @Input()
  order!:Order 

     
  constructor(private toaster: ToastrService,private router:Router) { }
  handler:any = null;
  ngOnInit(
  ) {
    this.loadStripe();
    console.log('Order object:', this.order); 
    if (this.order) {
      console.log('Total Price:', this.order.totalPrice);
    }
  }
  
  pay(amount: any) {    
  
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51P0d66SGbx6ba4nKZBeD3gbJR7BnktjKhmf7OtD6VJpwqz0PaPngmd2h7XMgiqZbqeKmjlpuODoLeQSegllYbjso0002RAKodk',
      locale: 'auto',
      token:  (token: any)=> {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        // alert('Token Created!!');
        this.toaster.success('Payment Successful')
        this.router.navigate([''])
  
      }
    });
  
    handler.open({
      name: 'Pyament Gateway',
      description: 'Pay Your Food Bill',
      amount: amount * 100
    });
  
  }
  
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51P0d66SGbx6ba4nKZBeD3gbJR7BnktjKhmf7OtD6VJpwqz0PaPngmd2h7XMgiqZbqeKmjlpuODoLeQSegllYbjso0002RAKodk',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
}
