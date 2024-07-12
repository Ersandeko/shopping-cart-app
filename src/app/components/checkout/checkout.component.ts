import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    public cartService: CartService, // Make cartService public
    private http: HttpClient,
    public activeModal: NgbActiveModal
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  adjustQuantity(productId: number, quantity: number): void {
    this.cartService.adjustQuantity(productId, quantity);
    this.totalPrice = this.cartService.getTotalPrice();
  }

  submitForm(): void {
    if (this.checkoutForm.valid) {
      const formData = {
        ...this.checkoutForm.value,
        items: this.cartItems,
        total: this.totalPrice
      };
      this.http.post('https://dummyjson.com/http/200', formData).subscribe(response => {
        this.cartService.clearCart();
        this.activeModal.close();
        alert('Checkout Successful!');
      });
    } else {
      alert('Form is invalid. Please fill out all required fields correctly.');
    }
  }
}
