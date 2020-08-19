import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductRest } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/ecommerce-app/api/products';

  constructor(private httpClient: HttpClient) { 
    this.httpClient.get<GetResponse>(this.baseUrl).subscribe(responseData=> console.log(responseData));
  }


  getProductList(): Observable<ProductRest[]> {
    return this.httpClient.get<ProductRest[]>(this.baseUrl);
  }

}

interface GetResponse {
  _embedded: {
    products: ProductRest[];
  }
}
