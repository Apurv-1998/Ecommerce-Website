import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductRest } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: ProductRest[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.listProducts();

  }


  //Async Method To Assign The Received ProductList From Spring To ProductService to Product Array
  listProducts(){
    this.productService.getProductList().subscribe(  
      data => {
        this.products = data;
      }
    )
  }

}
