/*
    Checkout Script
    Tyler Hunt
    04/28/26
*/



// Load cart
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Display order review
function displayOrderReview() {
    const container = document.getElementById("orderReview");
    if (!container) return;

    container.innerHTML = "<h3>Your Order</h3>";

    if (cart.length === 0) {
        container.innerHTML += "<p>Your cart is empty.</p>";
        return;
    }

    let subtotal = 0;
    // Adding item to cart price and building cart
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        container.insertAdjacentHTML("beforeend", `
            <div class="review-item">
                <span>${item.quantity} × ${item.name} ${item.size ? `(${item.size})` : ''}</span>
                <span>$${(itemTotal).toFixed(2)}</span>
            </div>
        `);
    });
    // Setting tax and total from subtotal above
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;

    container.insertAdjacentHTML("beforeend", `
        <div class="order-total">
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
            <p>Tax (8.25%): $${tax.toFixed(2)}</p>
            <h3>Total: $${total.toFixed(2)}</h3>
        </div>
    `);
}

// COPY FUNCTION
function copyBillingToShipping() {
    console.log("Copy button clicked"); // For debugging!!

    document.getElementById("shippingName").value = document.getElementById("billingName").value;
    document.getElementById("shippingAddress").value = document.getElementById("billingAddress").value;
    document.getElementById("shippingCity").value = document.getElementById("billingCity").value;
    document.getElementById("shippingState").value = document.getElementById("billingState").value;
    document.getElementById("shippingZip").value = document.getElementById("billingZip").value;
}

// Form submit
function handleSubmit(e) {
    e.preventDefault();
    alert("🎉 Order Placed Successfully!\n\nThank you for shopping at The Breakfast Embassy!");
    localStorage.removeItem("cart");
    window.location.href = "giftshop.html";
}
// Go Back button
function goBack() {
    window.location.href = "giftshop.html";
}

// Initialize
window.onload = () => {
    loadCart();
    displayOrderReview();
};

// Make functions available globally
window.copyBillingToShipping = copyBillingToShipping;
window.handleSubmit = handleSubmit;
window.goBack = goBack;