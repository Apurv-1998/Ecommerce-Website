import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductRest } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8080/ecommerce-app/api/products';
  private contextUrl = 'http://localhost:8080/ecommerce-app/api';

  constructor(private httpClient: HttpClient) { 
    this.httpClient.get<GetResponseProducts>(this.baseUrl).subscribe(responseData=> console.log(responseData));
  }


//Paginated Product List Method
  getPaginatedproduct(thePage: number,theLimit: number): Observable<ProductRest[]>{

    const searchUrl = `${this.contextUrl}/products`+`?page=${thePage}&limit=${theLimit}`;

    console.log(`search url for pagination -> ${searchUrl}`);

    return this.httpClient.get<ProductRest[]>(searchUrl);

  }


//Product List Method
  getProductList(theCategoryId: string): Observable<ProductRest[]> {

    const searchUrl = `${this.contextUrl}/category/${theCategoryId}/products`;

    return this.httpClient.get<ProductRest[]>(searchUrl);
  }

//Getting Single Product Method
  getProduct(productId: string): Observable<ProductRest> {

    const searchUrl = `${this.contextUrl}/products/${productId}`;

    return this.httpClient.get<ProductRest>(searchUrl);
  }

// Product categories Method
  getProductCategories(): Observable<ProductCategory[]> {
    
    const categorySearchUrl = `${this.contextUrl}/categories`;

    return this.httpClient.get<ProductCategory[]>(categorySearchUrl);
  }

//Product Search By Keyword Method
  searchProducts(theKeyWord: string): Observable<ProductRest[]> {
    
    const searchByKeywordUrl = `${this.contextUrl}/search/products?keyWord=${theKeyWord}`;

    return this.httpClient.get<ProductRest[]>(searchByKeywordUrl);

  }


}

interface GetResponseProducts {
  _embedded: {
    products: ProductRest[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
