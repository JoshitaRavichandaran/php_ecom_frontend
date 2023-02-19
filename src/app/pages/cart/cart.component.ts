import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart:any;

constructor(private productService:ProductService){}

ngOnInit(): void {
  
  this.productService.getCartProducts(localStorage.getItem('user_id')).subscribe((response)=>{
    this.cart=response;
    console.log(response);
  })

}

updateCart(index:number,sign:string)
{
  if(sign==="plus")
  {
    this.cart[index].pivot.quantity+=1;
    
  }
  else 
  {
    this.cart[index].pivot.quantity-=1;
  }

  this.cart[index].pivot.amount=this.cart[index].pivot.quantity*this.cart[index].price;

  let body = {
    quantity:this.cart[index].pivot.quantity,
    amount:this.cart[index].pivot.amount
  }

  if(this.cart[index].pivot.quantity>0)
  {
    this.productService.updateCart(body,this.cart[index].pivot.id).subscribe((response)=>{
      console.log(response);
    })

  }
  else 
  {
    this.productService.removeFromCart(this.cart[index].pivot.user_id,this.cart[index].pivot.product_id).subscribe((response:any)=>{
      if(response.success===true)
      {
        this.cart=response.cart;
      }
    })
  }
  
  
}

}
