import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state'; 

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormServiceService {

  //Setting up the context-url
  private contextUrl = 'http://localhost:8080/ecommerce-app/api';

  constructor(private httpClient: HttpClient) { }

  getCrediCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    for(let theMonth = startMonth; theMonth<=12; theMonth++){
      data.push(theMonth);
    }

    return of(data); //wraps object as an observable

  }

  getCreditCardYears(): Observable<number[]>{

    let data: number[] = [];

    const theCurrentYear: number = new Date().getFullYear();
    const endYear: number = theCurrentYear+10;


    for(let temp = theCurrentYear; temp<=endYear; temp++){
      data.push(temp);
    }

    return of(data); //wraps object as an observable

  }

  //Retrieving States and Countries Info

  //1 -> Countries
  retrieveCountryDetails(): Observable<Country[]>{

    const searchUrl = `${this.contextUrl}/locations/getCountries`;

    return this.httpClient.get<Country[]>(searchUrl);

  }

  //2 -> States
  retrieveStateDetails(theCountryCode: string): Observable<State[]>{

    const searhUrl = `${this.contextUrl}/locations/${theCountryCode}/getStates`;

    return this.httpClient.get<State[]>(searhUrl);
  }


}
