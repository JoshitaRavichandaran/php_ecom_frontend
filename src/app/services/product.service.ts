import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// export class ProductService {

//   constructor(private http : HttpClient) { }

//   public getProducts(){
//     return this.http.get('http://localhost:8000/api/products');
//   }

//   public getProduct(id : number){
//     return this.http.get(`http://localhost:8000/api/products/${id}`);
//   }
// }


export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts()
  {
    return this.http.get("http://localhost:8000/api/productswithcart/1");
  }

  addToCart(data:any)
  {
    let headers={"Content-Type":"application/json"};
    return this.http.post("http://localhost:8000/api/cart/add",data,{headers});
  }

  removeFromCart(userid:any,productid:any)
  {
    return this.http.delete(`http://localhost:8000/api/removefromcart/${userid}/${productid}`);
  }

  getCartProducts(userid:any)
  { 
    return this.http.get(`http://localhost:8000/api/cart/${userid}`);
  }

  updateCart(data:any,id:number)
  {
    let headers={"Content-Type":"application/json"};
    return this.http.put(`http://localhost:8000/api/cart/update/${id}`,data,{headers});
  }

  



}
