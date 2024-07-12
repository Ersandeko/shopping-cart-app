import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ProductListComponent, CartComponent]
})
export class AppComponent implements OnInit {
  title = 'shopping-cart-app';
  cartItemCount: number = 0;

  constructor(private modalService: NgbModal, private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartItemCount();
    this.cartService.cartItems$.subscribe(() => {
      this.updateCartItemCount();
    });
  }

  updateCartItemCount(): void {
    this.cartItemCount = this.cartService.getTotalItems();
  }

  openCart(): void {
    this.modalService.open(CartComponent);
  }
}
