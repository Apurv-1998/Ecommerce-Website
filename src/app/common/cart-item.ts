import { ProductRest } from './product';

export class CartItem {

    productId: string;
    name: string;
    description: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;

    constructor(product: ProductRest){
        this.productId = product.productId;
        this.name = product.name;
        this.description = product.description;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;

        this.quantity = 1;
    }

}
