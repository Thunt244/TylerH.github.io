/* 

    Author: Tyler Hunt 
    Project: project_1 javascript
    Date last modified: 04/01/2026 (change me)

*/
// constants and values
    
const TAX_RATE = 0.0825;   // 8.25% tax

function formatCurrency(value) {
    return "$" + value.toFixed(2);
}

// Change number of nights
function changeNights(amount) {
    let input = document.getElementById('nights');
    let current = parseInt(input.value);
    let newValue = current + amount;
    if (newValue >= 1 && newValue <= 30) {
        input.value = newValue;
        calcTotal();
    }
}

// Change number of guests
function changeGuests(amount) {
    let input = document.getElementById('guests');
    let current = parseInt(input.value);
    let newValue = current + amount;
    if (newValue >= 1 && newValue <= 20) {
        input.value = newValue;
        calcTotal();
    }
}

// Main calculation function
function calcTotal() {
    let subtotal = 0;

    // Get selected room nightly rate
    const roomRadios = document.getElementsByName("room");
    let roomRate = 0;
    for (let radio of roomRadios) {
        if (radio.checked) {
            roomRate = parseFloat(radio.value);
            break;
        }
    }

    const numNights = parseInt(document.getElementById('nights').value) || 1;
    const numGuests = parseInt(document.getElementById('guests').value) || 1;

    // Room cost = rate × nights
    subtotal += roomRate * numNights;

    // Meal costs
    const mealIds = [
        'all_american', 'biscuits', 'chicken_fried_steak', 'steak',
        'blini', 'syrniki', 'borsch', 'stroganoff',
        'farmers', 'weissworst', 'sauerbraten', 'schweinhaxe',
        'cornetto', 'uova', 'osso', 'parmigiana',
        'classic_french', 'crepes', 'coq', 'bourguignon'
    ];

    let mealPricePerPerson = 0;
    for (let id of mealIds) {
        const cb = document.getElementById(id);
        if (cb && cb.checked) {
            mealPricePerPerson += parseFloat(cb.value);
        }
    }

    // Meals are charged per person per stay (most common for B&B)
    subtotal += mealPricePerPerson * numGuests * numNights;

    // Calculate tax and grand total
    const tax = subtotal * TAX_RATE;
    const grandTotal = subtotal + tax;

    // Update sticky bar
    document.getElementById('foodTotal').textContent = formatCurrency(subtotal);
    document.getElementById('foodTax').textContent = formatCurrency(tax);
    document.getElementById('totalBill').textContent = formatCurrency(grandTotal);
}

// Reset entire form
function resetForm() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById('french_room').checked = true;
    document.getElementById('nights').value = 1;
    document.getElementById('guests').value = 2;
    calcTotal();
}

// Initialize page
window.onload = function() {
    // Attach change listeners
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
        input.addEventListener('change', calcTotal);
    });

    // Initial calculation
    calcTotal();
};