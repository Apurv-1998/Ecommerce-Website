import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductRest } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: ProductRest[];

  currentCategoryId: string;

  searchMode: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
       this.listProducts();
    });

  }


  //Async Method To Assign The Received ProductList From Spring To ProductService to Product Array
  listProducts(){

    //If The user is on the search component then handle List products will be called otherwise normal, by =Category searching will be there

    this.searchMode = this.route.snapshot.paramMap.has('keyWord');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
    
  }


  //Getting The Search KeyWord Product List

  handleSearchProducts(){

    const theKeyWord: string = this.route.snapshot.paramMap.get('keyWord');

    //Search products Using That KeyWord

    this.productService.searchProducts(theKeyWord).subscribe(
      data =>{
        console.log('Received Data => '+ JSON.stringify(data));
        this.products = data;
      }
    );

  }


  //Handling The Route From The Search Component

  handleListProducts() {

    //Check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('categoryId');


    
    if(hasCategoryId){
      //read it and convert to a number using the '+' symbol

      this.currentCategoryId = this.route.snapshot.paramMap.get('categoryId');
    }
    else{
      this.currentCategoryId = '';
    }


    //now get the products fro given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(  
      data => {
        this.products = data;
      }
    );

  }

}
