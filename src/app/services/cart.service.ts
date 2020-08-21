import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

// Adding The Observables  
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){

    //Check if we already have item in our class

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length>0){

      // find the item in the cart based on item id

      for(let temp of this.cartItems){
        if(temp.productId == theCartItem.productId){
          existingCartItem = temp;
          break;
        }
      }

     // existingCartItem = this.cartItems.find(temp => {temp.productId === theCartItem.productId});

      //check if we found it

      alreadyExistsInCart = (existingCartItem != undefined);
      console.log('Already Present '+alreadyExistsInCart);

    }


    if(alreadyExistsInCart){
      //increment the quantity of that item
      existingCartItem.quantity++;
    }
    else{
      //just add the item to the array -> cart
      this.cartItems.push(theCartItem);
    }

    // compute the total price of the cart and the total quantity

    this.computeCartTotals();



  }

  computeCartTotals(){

    let totalCartPrice: number = 0;
    let totalCartQuantity: number = 0;

    for(let temp of this.cartItems){
      totalCartPrice+= (temp.unitPrice*temp.quantity);
      totalCartQuantity+=temp.quantity;
    }

    //Publish the new values .... all subscribers will get the update

    this.totalPrice.next(totalCartPrice);
    this.totalQuantity.next(totalCartQuantity);

    //Log-in the cart data

    this.logCartData(totalCartPrice,totalCartQuantity);
  }


  logCartData(totalCartPrice: number, totalCartQuantity: number) {
    console.log('Contents of the cart');

    for(let temp of this.cartItems){
     
      const subTotalPrice = temp.unitPrice*temp.quantity;

      console.log(`name: ${temp.name}, quantity: ${temp.quantity}, unitPrice: ${temp.unitPrice}, subTotalPrice: ${subTotalPrice}`);
      
    }
    //show the total price upto two decimal places only
    console.log(`totalcartPricevalue: ${totalCartPrice.toFixed(2)}, totalcartQuantityValue: ${totalCartQuantity}`);

    console.log('-----------------------');
  }

  // Decrementing the cart quantity

  decrementCartQuantity(theCartItem: CartItem){

    theCartItem.quantity--;

    if(theCartItem.quantity == 0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }

  }

  remove(theCartItem: CartItem){

    //get index of the item in the cart array

    const index = this.cartItems.findIndex(temp => temp.productId === theCartItem.productId);

    //if found, remove the item from array at that index

    if(index>-1){
      this,this.cartItems.splice(index,1);

      this.computeCartTotals();
    }
  }
}
