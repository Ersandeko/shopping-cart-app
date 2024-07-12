import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CartService } from '../../services/cart.service'; // Import CartService
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, NgbModalModule, NgxPaginationModule, FormsModule]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  totalItems: number = 0;
  page: number = 1;
  limit: number = 5;
  searchQuery: string = '';

  constructor(
    private productService: ProductService, 
    private modalService: NgbModal, 
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts(this.limit, (this.page - 1) * this.limit).subscribe(response => {
      this.products = response.products;
      this.totalItems = response.total;
    });
  }

  searchProducts(): void {
    if (this.searchQuery.trim() !== '') {
      this.productService.searchProducts(this.searchQuery).subscribe(response => {
        this.products = response.products;
        this.totalItems = response.total;
      });
    } else {
      this.fetchProducts();
    }
  }

  openProductDetail(productId: number): void {
    const modalRef = this.modalService.open(ProductDetailComponent);
    modalRef.componentInstance.productId = productId;
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.fetchProducts();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.fetchProducts();
  }
}
