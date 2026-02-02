import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { RouterLink } from '@angular/router';
import { Injproducts } from '../../../injproducts';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-product-get',
  imports: [RouterLink],
  templateUrl: './product-get.html',
  styleUrl: './product-get.css',
})
export class ProductGet implements OnInit {

  protected products: Product[] = [];
  constructor(private fb: FormBuilder, private lss: Injproducts) {}

  ngOnInit(): void {
    const savedProducts = this.lss.getItem<Product[]>('products');
    this.products = savedProducts ?? [];
  }

  deleteProduct(id: number) {
    const confirmDelete = confirm('Supprimer ce produit ?');
    if (!confirmDelete) return;

    this.products = this.products.filter(p => p.id !== id);
    this.lss.setItem('products', this.products);
  }
}
