import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../model/product';


@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css',
})
export class ProductEdit {
  angForm!: FormGroup;
  protected product: Product = {
    id : 0,
    ProductName: '',
    ProductDescription: '',
    ProductPrice: 0
  }; 

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  this.angForm = this.fb.group({
    ProductName: ['', Validators.required],
    ProductDescription: ['', Validators.required],
    ProductPrice: ['', Validators.required],
  });

  if (this.product) {
    this.angForm.patchValue({
      ProductName: this.product.ProductName,
      ProductDescription: this.product.ProductDescription,
      ProductPrice: this.product.ProductPrice,
    });
  }
}

submitForm() {
  if (this.angForm.valid) {
    const updatedProduct = this.angForm.value;
  }
}

}
