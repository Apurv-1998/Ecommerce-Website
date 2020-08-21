import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  //To Be Imported From -> Cart Details
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode:['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode:['']
      }),
      creditCard: this.formBuilder.group({
        cardType: ['Visa'],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth:[''],
        expirationYear: ['']
      })
    });
  }

  onSubmit(){
    console.log('Handling Form Submission');
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log('Customer emial-value -> '+this.checkoutFormGroup.get('customer').get('email').value);
  }

  copyShppingAddressToBillingAddress(event) {

    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }

  }

}
