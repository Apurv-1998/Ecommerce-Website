import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails(){
    //get a handle to the cart items

    this.cartItems = this.cartService.cartItems;

    //subscribe to the cart total price

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );

    //subscribe to the cart total quantity

    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
      }
    );

    // compute cart total price and quantity

    this.cartService.computeCartTotals();

  }

  incrementQuantity(theCartItem: CartItem){
    console.log(`Cart Item: ${JSON.stringify(theCartItem)}`);
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem){
    this.cartService.decrementCartQuantity(theCartItem);
  }

  remove(theCartItem: CartItem){
    this.cartService.remove(theCartItem);
  }

}
