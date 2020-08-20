import { Component, OnInit } from '@angular/core';
import { ProductRest } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: ProductRest = new ProductRest();

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }



  handleProductDetails() {

    const productId: string = this.route.snapshot.paramMap.get('productId');

    //We Will Get The ProductList Corresponding To The Above ProductId

    this.productService.getProduct(productId).subscribe(
      data => {
        console.log('Product Data Received :-> ',JSON.stringify(data));
        this.product = data;
      }
    );

    
  }

}
