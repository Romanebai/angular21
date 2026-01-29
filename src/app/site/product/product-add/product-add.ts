import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Injproducts } from '../../../injproducts';
import { Product } from '../../../model/product';


@Component({
  selector: 'app-product-add',
  standalone: true, 
  imports: [ReactiveFormsModule], 
  templateUrl: './product-add.html',
  styleUrls: ['./product-add.css'],
})
export class ProductAdd implements OnInit {
  angForm!: FormGroup;

constructor(
  private fb: FormBuilder,
  private lss: Injproducts,
  private router: Router
) {}

  ngOnInit(): void {
    this.angForm = this.fb.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required],
    });
  }

  submitForm() {
  if (this.angForm.valid) {
    const products = this.lss.getItem<Product[]>('products') ?? [];

    const newProduct: Product = {
      id: Date.now(), // simple et suffisant
      ProductName: this.angForm.value.ProductName,
      ProductDescription: this.angForm.value.ProductDescription,
      ProductPrice: this.angForm.value.ProductPrice,
    };

    products.push(newProduct);

    this.lss.setItem('products', products);

    this.router.navigate(['/product']);
  }
}
}
