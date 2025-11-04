// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 99.99,
        category: "electronics",
        image: "🎧"
    },
    {
        id: 2,
        title: "Cotton T-Shirt",
        description: "Comfortable 100% cotton t-shirt in various colors",
        price: 24.99,
        category: "clothing",
        image: "👕"
    },
    {
        id: 3,
        title: "JavaScript Guide",
        description: "Complete guide to modern JavaScript programming",
        price: 39.99,
        category: "books",
        image: "📚"
    },
    {
        id: 4,
        title: "Smart Watch",
        description: "Feature-rich smartwatch with health monitoring",
        price: 199.99,
        category: "electronics",
        image: "⌚"
    },
    {
        id: 5,
        title: "Yoga Mat",
        description: "Non-slip yoga mat perfect for home workouts",
        price: 29.99,
        category: "home",
        image: "🧘"
    },
    {
        id: 6,
        title: "Denim Jeans",
        description: "Classic fit denim jeans in premium quality",
        price: 79.99,
        category: "clothing",
        image: "👖"
    },
    {
        id: 7,
        title: "Laptop Stand",
        description: "Adjustable aluminum laptop stand for better ergonomics",
        price: 49.99,
        category: "electronics",
        image: "💻"
    },
    {
        id: 8,
        title: "Plant Pot Set",
        description: "Set of 3 ceramic plant pots with drainage holes",
        price: 34.99,
        category: "home",
        image: "🪴"
    }
];

// Shopping cart
let cart = [];
let filteredProducts = [...products];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');

// Initialize the app
function init() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
}

// Render products
function renderProducts() {
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="loading">No products found</div>';
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Filter products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedPriceRange = priceFilter.value;

    filteredProducts = products.filter(product => {
        // Search filter
        const matchesSearch = product.title.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);

        // Category filter
        const matchesCategory = !selectedCategory || product.category === selectedCategory;

        // Price filter
        let matchesPrice = true;
        if (selectedPriceRange) {
            const price = product.price;
            switch (selectedPriceRange) {
                case '0-50':
                    matchesPrice = price <= 50;
                    break;
                case '50-100':
                    matchesPrice = price > 50 && price <= 100;
                    break;
                case '100-200':
                    matchesPrice = price > 100 && price <= 200;
                    break;
                case '200+':
                    matchesPrice = price > 200;
                    break;
            }
        }

        return matchesSearch && matchesCategory && matchesPrice;
    });

    renderProducts();
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = 'Total: $0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Toggle cart modal
function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);
    cart = [];
    updateCartUI();
    toggleCart();
}

// Close modal when clicking outside
cartModal.addEventListener('click', function(e) {
    if (e.target === cartModal) {
        toggleCart();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);