import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CheckoutFormServiceService } from 'src/app/services/checkout-form-service.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';

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

  //Credit Card Years and Months
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  //Country and States
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private checkoutFormService: CheckoutFormServiceService) { }

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

    //Populating credit card months and years

    //1-> Months
    const startMonth: number = new Date().getMonth()+1;
    console.log('Current Month '+startMonth);

    this.checkoutFormService.getCrediCardMonths(startMonth).subscribe(
      data => {
        console.log(`Credit Card Months Details -> ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      }
    );

    //2-> Years

    this.checkoutFormService.getCreditCardYears().subscribe(
      data => {
        console.log(`Credit card Years -> ${JSON.stringify(data)}`);
        this.creditCardYears = data;
      }
    );


    //Countries will be populated on initialization itself

    // 1-> Countries

      this.checkoutFormService.retrieveCountryDetails().subscribe(
        data => {
          console.log('Country Data Received -> '+JSON.stringify(data));
          this.countries = data;
        }
      );


  }

  onSubmit(){
    console.log('Handling Form Submission');
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log('Customer email-value -> '+this.checkoutFormGroup.get('customer').get('email').value);
    console.log(`The Shipping Address Country Is -> ${this.checkoutFormGroup.get('shippingAddress').value.country.countryName}`);
    console.log(`The Shipping Address State Is -> ${this.checkoutFormGroup.get('shippingAddress').value.state.stateName}`);
  }

  copyShppingAddressToBillingAddress(event) {

    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      //SETTING THE BILLING ADDRESS STATE AS SAME AS SHIPPING ADDRESS STATE
      this.billingAddressStates = this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();

      //clearing the billing address states
      this.billingAddressStates = [];
    }

  }

  handleMonthsAndYears(){

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth()+1;
    }
    else{
      startMonth = 1;
    }


    this.checkoutFormService.getCrediCardMonths(startMonth).subscribe(
      data => {
        console.log(`Retrieved Credit card Months: ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      }
    );

  }

  //Getting The States Details From The Country Selected

  getStates(formGroupName: string){

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryId = formGroup.value.country.countryId; // Getting the respective country Code from the Country Class
    const countryName = formGroup.value.country.countryName;

    console.log(`${formGroupName} -> country code: ${countryId} & countryName: ${countryName}`);

    this.checkoutFormService.retrieveStateDetails(countryId).subscribe(
      data => {
        console.log('The State Data Received -> '+JSON.stringify(data));

        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }

        formGroup.get('state').setValue(data[0]);
      }
    );

  }

}
