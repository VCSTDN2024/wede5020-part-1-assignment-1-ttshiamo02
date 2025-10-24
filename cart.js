// cart.js - Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateCartDisplay();
    }

    bindEvents() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                this.addItem(
                    e.target.dataset.product,
                    parseInt(e.target.dataset.price)
                );
            });
        });

        // Cart toggle
        document.querySelector('.cart-toggle').addEventListener('click', () => {
            this.toggleCart();
        });

        // Close cart
        document.querySelector('.close-cart').addEventListener('click', () => {
            this.closeCart();
        });
    }

    addItem(name, price) {
        const existingItem = this.items.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        this.saveToStorage();
        this.updateCartDisplay();
        this.showAddToCartAnimation(name);
    }

    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(name, quantity) {
        const item = this.items.find(item => item.name === name);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(name);
            } else {
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const cartTotal = document.querySelector('#cart-total');
        const cartItems = document.querySelector('.cart-items');

        // Update count
        cartCount.textContent = this.getItemCount();

        // Update total
        cartTotal.textContent = this.getTotal();

        // Update items list
        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>R${item.price} each</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" data-action="decrease" data-product="${item.name}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase" data-product="${item.name}">+</button>
                    <button class="remove-btn" data-product="${item.name}">🗑️</button>
                </div>
            </div>
        `).join('');

        // Bind events for new buttons
        this.bindCartItemEvents();
    }

    bindCartItemEvents() {
        // Quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const product = e.target.dataset.product;
                const item = this.items.find(item => item.name === product);
                
                if (action === 'increase') {
                    this.updateQuantity(product, item.quantity + 1);
                } else if (action === 'decrease') {
                    this.updateQuantity(product, item.quantity - 1);
                }
            });
        });

        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.removeItem(e.target.dataset.product);
            });
        });
    }

    toggleCart() {
        document.querySelector('.cart-sidebar').classList.toggle('active');
    }

    closeCart() {
        document.querySelector('.cart-sidebar').classList.remove('active');
    }

    showAddToCartAnimation(productName) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = `Added ${productName} to cart!`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--accent-purple);
            color: white;
            padding: 1rem;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    saveToStorage() {
        localStorage.setItem('batBakeryCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('batBakeryCart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});