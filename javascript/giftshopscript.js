/*
    Gift Shop Script for The Breakfast Embassy
    Tyler Hunt
    04/28/26
    
    Features:
    - Add to Cart with confirmation
    - View / Edit Cart (quantity, remove)
    - Checkout form with validation (Name, Email, Phone)
    - Billing to Shipping
*/
// Creates emply array called cart to store items they put in cart ovbiously
let cart = [];

// Tax Rate (8.25%)
const TAX_RATE = 0.0825;

// Products Array housing id, name, price, description, image and if it has sizes or not.
const products = [
    {
        id: 1,
        name: "French Mug",
        price: 8.00,
        description: "Elegant porcelain mug with French inspired designs",
        image: "images/french-mug.jpeg"
    },
    {
        id: 2,
        name: "Italian Espresso Set",
        price: 14.00,
        description: "2 espresso cups & saucers inspired by italy",
        image: "images/gift-italian-espresso.jpeg"
    },
    {
        id: 3,
        name: "Snow Globe",
        price: 25.00,
        description: "Snow Globe with logo in the center",
        image: "images/snow-globe.jpeg"
    },
    {
        id: 4,
        name: "Embassy Logo T-Shirt",
        price: 14.00,
        description: "Soft cotton t-shirt with Breakfast Embassy logo",
        image: "images/logo_shirt.jpeg",
        hasSize: true
    },
    {
        id: 5,
        name: "Lavender & Honey Candle",
        price: 11.00,
        description: "French-inspired lavender and honey scented candle",
        image: "images/lavender_honey_candle.jpg"
    },
    {
        id: 6,
        name: "Breakfast Embassy Apron",
        price: 24.00,
        description: "Stylish apron perfect for home chefs",
        image: "images/logo-apron.jpeg",
        hasSize: true
    }
];

/* ====================== RENDER PRODUCTS ====================== */
function renderProducts() {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product => {
        let sizeHTML = "";

        if (product.hasSize) {
            sizeHTML = `
                <select id="size-${product.id}">
                    <option value="S">Small</option>
                    <option value="M" selected>Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">X-Large</option>
                </select>`;
        }

        const cardHTML = `
            <div class="product-card">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="product-image"
                     onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                
                ${sizeHTML}
                
                <div class="quantity-selector">
                    <button onclick="decreaseQty(${product.id})">-</button>
                    <span id="qty-${product.id}" class="quantity-display">1</span>
                    <button onclick="increaseQty(${product.id})">+</button>
                </div>
                
                <button onclick="addToCart(${product.id})" class="add-btn">Add to Cart</button>
            </div>
        `;

        container.insertAdjacentHTML("beforeend", cardHTML);
    });
}

/* ====================== QUANTITY CONTROLS ====================== */
function increaseQty(id) {
    const qtyElement = document.getElementById(`qty-${id}`);
    let current = parseInt(qtyElement.textContent);
    qtyElement.textContent = current + 1;
}

function decreaseQty(id) {
    const qtyElement = document.getElementById(`qty-${id}`);
    let current = parseInt(qtyElement.textContent);
    if (current > 1) {
        qtyElement.textContent = current - 1;
    }
}

/* ====================== ADD TO CART ====================== */
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const qtyElement = document.getElementById(`qty-${id}`);
    let quantity = parseInt(qtyElement.textContent);

    let size = null;
    if (product.hasSize) {
        size = document.getElementById(`size-${id}`).value;
    }

    const existing = cart.find(item => item.id === id && item.size === size);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity,
            size: size
        });
    }

    updateCartCount();
    alert(`${quantity} × ${product.name} added to cart! 🛒`);
}

/* ====================== CART COUNT ====================== */
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = count;
}

/* ====================== SHOW CART WITH TAX ====================== */
function showCart() {
    const modal = document.getElementById("cartModal");
    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("cartSubTotal").textContent = "0.00";
        document.getElementById("cartTax").textContent = "0.00";
        document.getElementById("cartTotal").textContent = "0.00";
        modal.style.display = "block";
        return;
    }

    let subtotal = 0;
    // adding item to cart and total
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name} ${item.size ? `(${item.size})` : ''}</h4>
                    <p>$${item.price.toFixed(2)} each</p>
                    <div class="quantity-control">
                        <button onclick="changeQuantity(${index}, -1)">−</button>
                        <span class="quantity">${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div>
                    <p class="item-total">$${(itemTotal).toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", itemHTML);
    });

    // Calculate Tax and Total
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    // Display breakdown of prices
    document.getElementById("cartSubTotal").textContent = subtotal.toFixed(2);
    document.getElementById("cartTax").textContent = tax.toFixed(2);
    document.getElementById("cartTotal").textContent = total.toFixed(2);

    modal.style.display = "block";
}

/* ====================== CART FUNCTIONS ====================== */
function changeQuantity(index, change) {
    const newQty = cart[index].quantity + change;
    if (newQty < 1) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQty;
        showCart();
        updateCartCount();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
    updateCartCount();
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}
// Proceed to Checkout - Save cart and go to checkout page
function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    // Save cart to localStorage so checkout.html can read it
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html";
}

/* ====================== INITIALIZE ====================== */
window.onload = () => {
    renderProducts();
    updateCartCount();
};


// Make functions available to HTML
window.addToCart = addToCart;
window.showCart = showCart;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;
window.closeCart = closeCart;
window.goToCheckout = goToCheckout;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;

