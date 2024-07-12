import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CartComponent {
  cartItems: any[];

  constructor(private cartService: CartService, private modalService: NgbModal) {
    this.cartItems = this.cartService.getCartItems(); // Ensure cartItems is initialized in the constructor
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems(); // Update the cart items after removing
  }

  adjustQuantity(productId: number, quantity: number): void {
    this.cartService.adjustQuantity(productId, quantity);
    this.cartItems = this.cartService.getCartItems(); // Update the cart items after adjusting quantity
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  openCheckout(): void {
    this.modalService.open(CheckoutComponent);
  }
}
