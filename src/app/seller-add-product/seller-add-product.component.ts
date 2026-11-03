import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  @ViewChild('addProductForm') addProductForm!: NgForm;

  constructor(private product: ProductsService) { }

  ngOnInit(): void {
  }

  addNewProduct(data: Product) {
    this.product.addProduct(data)
      .subscribe((result) => {
        if (result) {
          this.addProductMessage = "Product added successfully!";
          this.addProductForm.resetForm();
        } else {
          this.addProductMessage = "Failed to add product.";
        }
        setTimeout(() => {
          this.addProductMessage = undefined;
        }, 3000);
      });
  }
}
