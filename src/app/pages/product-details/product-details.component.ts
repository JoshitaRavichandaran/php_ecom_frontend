import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
 products:any = [];
 id:any;
 constructor(private product : ProductService, private route : ActivatedRoute){}
 ngOnInit(){
   this.id = this.route.snapshot.paramMap.get('id');
   this.product.getProducts().subscribe((response)=>{
    this.products = response;
   });
 }
}
