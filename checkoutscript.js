/*
    Checkout Script
    Tyler Hunt
    04/28/26
*/

let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Display order review
function displayOrderReview() {
    const container = document.getElementById("orderReview");
    container.innerHTML = "<h3>Order Summary</h3>";

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const html = `
            <div class="review-item">
                <span>${item.quantity} × ${item.name} ${item.size ? `(${item.size})` : ''}</span>
                <span>$${(itemTotal).toFixed(2)}</span>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", html);
    });

    const tax = subtotal * 0.0825;
    const total = subtotal + tax;

    container.innerHTML += `
        <div class="order-total">
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
            <p>Tax (8.25%): $${tax.toFixed(2)}</p>
            <h3>Total: $${total.toFixed(2)}</h3>
        </div>
    `;
}

// Copy billing to shipping
function copyBillingToShipping() {
    document.getElementById("shippingName").value = document.getElementById("billingName").value;
    document.getElementById("shippingAddress").value = document.getElementById("billingAddress").value;
    document.getElementById("shippingCity").value = document.getElementById("billingCity").value;
    document.getElementById("shippingState").value = document.getElementById("billingState").value;
    document.getElementById("shippingZip").value = document.getElementById("billingZip").value;
}

// Form submission with validation
function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("billingName").value.trim();
    const email = document.getElementById("billingEmail").value.trim();
    const phone = document.getElementById("billingPhone").value.trim();

    if (name.length < 3) {
        alert("Please enter a valid full name.");
        return;
    }
    if (!email.includes("@") || email.length < 6) {
        alert("Please enter a valid email address.");
        return;
    }
    if (phone.length < 10) {
        alert("Please enter a valid phone number.");
        return;
    }

    alert("🎉 Order Placed Successfully!\n\nThank you for shopping at The Breakfast Embassy!\n\nA confirmation has been sent to your email.");

    // Clear cart after successful order
    localStorage.removeItem("cart");
    window.location.href = "giftshop.html";
}

function goBack() {
    window.location.href = "giftshop.html";
}

// Initialize checkout page
window.onload = () => {
    loadCart();
    displayOrderReview();
};