import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
// export class ProductListComponent implements OnInit{
  
//   products : any = [];
//   productids : any = [];
//   user_id : any = localStorage.getItem('user_id');
//   message : string = 'Add to cart';
//   constructor (private product : ProductService){}

//   ngOnInit() {
      
//     this.product.getProducts().subscribe((response:any)=>{
//       this.products = response;
//       for(var i = 0 ; i < response.length ; i++){
//       this.productids.push(response[i].id);
//       }
//       console.log(this.productids);
//     })
  
//   }
//   // addTocart(product_id :any, user_id: any, amount : any, quantity : any){
//   //   this.product.addToCart({"product_id" : product_id, "user_id" : user_id, "amount" : amount, "quantity" : quantity }).subscribe((response:any)=>{
//   //    if(response.success = true){
//   //     this.message = "Added To Cart";
//   //    }
//   //   });
//   // }

// }
export class ProductListComponent implements OnInit {

  products:any;
  cart:any;

  constructor(private productService:ProductService){}


  ngOnInit(): void {
    this.productService.getProducts().subscribe((response:any)=>{

      this.products=response.products;
      this.cart=response.cart;
      console.log(response);
    })
  }

    checkInCart(product:any)
    {
      let cp=this.cart.find((p:any)=>{
        return p.pivot.user_id==1 && p.pivot.product_id===product.id;
      })

      if(cp===undefined)
      {
        return false;
      }

      return true;



    }


    addToCart(product:any)
    {
        let item={
          user_id:1,
          product_id:product.id,
          amount:product.price
        }

        this.productService.addToCart(item).subscribe((response:any)=>{
          console.log(response);
          if(response.success===true)
          {
            this.cart=response.cart;
          }
        })


    }


    removeFromCart(productid:any)
    {
      this.productService.removeFromCart(1,productid).subscribe((response:any)=>{
        if(response.success===true)
        {
          this.cart=response.cart;
        }
      })
    }

}



