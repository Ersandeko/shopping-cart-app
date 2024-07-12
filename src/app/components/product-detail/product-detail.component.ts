import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [CommonModule, FormsModule, NgbModalModule]
})
export class ProductDetailComponent implements OnInit {
  @Input() productId!: number;
  product: any;
  loading = true;

  constructor(
    private productService: ProductService, 
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.fetchProductDetail();
  }

  fetchProductDetail(): void {
    this.productService.getProductById(this.productId).subscribe(response => {
      this.product = response;
      this.loading = false;
    });
  }
}
