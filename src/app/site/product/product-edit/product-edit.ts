import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../model/product';
import { Injproducts } from '../../../injproducts';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css',
})

export class ProductEdit {
  angForm!: FormGroup;
  productId!: number;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private injproducts: Injproducts
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.angForm = this.fb.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required],
    });

    const storedProducts = this.injproducts.getItem<Product[]>('products') ?? [];

    const product = storedProducts.find(p => p.id === this.productId);

    if (!product) {
      this.router.navigate(['/product']);
      return;
    }

    this.products = storedProducts;
    this.angForm.patchValue(product);
  }

  submitForm() {
    if (this.angForm.invalid) {
      this.angForm.markAllAsTouched();
      return;
    }

    const updatedProduct: Product = {
      id: this.productId,
      ...this.angForm.value,
    };

    const index = this.products.findIndex(p => p.id === this.productId);
    this.products[index] = updatedProduct;

    this.injproducts.setItem('products', this.products);

    this.router.navigate(['/product']);
  }
}
